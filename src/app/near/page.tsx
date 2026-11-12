"use client";
import { useEffect, useRef, useState } from "react";
import { DESTS } from "@/lib/destinations";
import { distKm, roadEstimate } from "@/lib/geo";
import { useLocation } from "@/lib/location";
import { describe, Wx } from "@/lib/weather";
import { useWeather } from "@/lib/weather-context";
import { Card } from "@/components/ui";
import TravelMap from "@/components/TravelMap";
import Link from "next/link";

interface Here {
  place: string | null;
  weather: { temp: number; feels: number; code: number; humidity: number; wind: number; rain: number; hi: number; lo: number; uv: number; sunrise: string; sunset: string } | null;
}
interface Place { id: string; name: string; address: string; lat: number; lon: number; distance: number | null }
const CATS: [string, string][] = [["restaurant", "Restaurants"], ["hotel", "Hotels"], ["hospital", "Hospitals"], ["pharmacy", "Pharmacies"], ["fuel", "Fuel stations"]];

export default function NearMe() {
  const { pos, status, start, stop } = useLocation();
  const { wx } = useWeather();
  const [here, setHere] = useState<Here | null>(null);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const last = useRef<{ lat: number; lon: number; t: number } | null>(null);
  const centred = useRef(false);

  // Ask for the address and weather when the person moves 200 m or after 5 minutes.
  useEffect(() => {
    if (!pos) return;
    if (!centred.current) { setCenter([pos.lat, pos.lon]); centred.current = true; }
    const l = last.current;
    if (l && distKm(l, pos) < 0.2 && Date.now() - l.t < 300000) return;
    last.current = { lat: pos.lat, lon: pos.lon, t: Date.now() };
    fetch(`/api/here?lat=${pos.lat}&lon=${pos.lon}`).then((r) => r.json()).then((j) => !j.error && setHere(j)).catch(() => {});
  }, [pos]);

  if (!pos) {
    return (
      <Card className="mx-auto max-w-xl">
        <h1>Near me</h1>
        <p className="mb-4">
          See where you are now, the weather at your spot, and the closest
          places to visit.
        </p>
        {status === "asking" && (
          <p className="mb-4">
            Waiting for your location. Please press <b>Allow</b> in the browser
            box.
          </p>
        )}
        {status === "denied" && (
          <p role="alert" className="mb-4">
            Location is blocked. Click the lock icon next to the web address,
            allow Location, and try again.
          </p>
        )}
        {status === "unavailable" && (
          <p role="alert" className="mb-4">
            Your position is not available now. Go outside or turn on GPS, then
            try again.
          </p>
        )}
        {status === "unsupported" && (
          <p role="alert" className="mb-4">
            This browser does not support location.
          </p>
        )}
        <button
          className="btn btn-p"
          onClick={start}
          disabled={status === "asking"}
        >
          📍 Use my location
        </button>
        <p className="mt-4 text-xs" style={{ color: "var(--mu)" }}>
          Your location stays in your browser. It is sent only to look up the
          address and weather. It is not saved.
        </p>
      </Card>
    );
  }

  const nearest = DESTS.map((d) => ({ d, km: distKm(pos, d) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 5);
  const w = here?.weather;
  const info = w ? describe(w.code) : null;

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <h1>Near me</h1>
          <div className="row mb-3">
            <span className="live">
              <i />
              Live location{status === "unavailable" ? " (signal weak)" : ""}
            </span>
            <button className="btn btn-sm" onClick={stop}>
              Turn off
            </button>
          </div>
          <p className="mb-2 font-semibold">
            {here?.place ?? "Finding your address..."}
          </p>
          <p className="text-sm" style={{ color: "var(--mu)" }}>
            {pos.lat.toFixed(5)}, {pos.lon.toFixed(5)} · accuracy ±{pos.acc} m
            <br />
            Updated {new Date(pos.time).toLocaleTimeString()}
            {pos.speed != null && pos.speed > 0.5
              ? ` · moving ${Math.round(pos.speed * 3.6)} km/h`
              : ""}
          </p>
        </Card>
        
        <Card className="cream">
          <h2>Weather where you are</h2>
          {w && info ? (
            <>
              <div className="mb-3 text-[48px] font-light leading-none">
                {w.temp}°C
              </div>
              <p className="mb-2">
                {info.icon} {info.text}. Feels like {w.feels}°C. Today {w.lo}° to{" "}
                {w.hi}°.
              </p>
              <p className="mb-2">
                Rain chance {w.rain}%. Wind {w.wind} km/h. Humidity {w.humidity}%. UV
                up to {w.uv}.
              </p>
              <p className="text-sm">
                Sunrise {w.sunrise.slice(11, 16)}. Sunset {w.sunset.slice(11, 16)}.
              </p>
            </>
          ) : (
            <p>Loading weather...</p>
          )}
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <div className="row mb-3">
            <h2 className="!mb-0">Map</h2>
            <button
              className="btn btn-sm"
              onClick={() => setCenter([pos.lat, pos.lon])}
            >
              Centre on me
            </button>
          </div>
          {center && (
            <TravelMap
              center={center}
              zoom={10}
              me={{ lat: pos.lat, lon: pos.lon, acc: pos.acc }}
              pins={DESTS.map((d) => ({
                id: d.id,
                lat: d.lat,
                lon: d.lon,
                label: d.name,
              }))}
            />
          )}
        </Card>
        
        <Card>
          <h2>Closest destinations</h2>
          {nearest.map(({ d, km }) => {
            const t = wx[d.id] as Wx | undefined;
            return (
              <div key={d.id} className="line">
                <span>
                  {d.icon} <b>{d.name}</b>
                  <br />
                  <small style={{ color: "var(--mu)" }}>
                    {Math.round(km)} km away · about {roadEstimate(pos, d)} km by
                    road{t ? ` · ${t.temp}°C` : ""}
                  </small>
                </span>
                <Link
                  className="btn btn-sm"
                  href={`/routes?from=me&to=${d.id}`}
                >
                  Route
                </Link>
              </div>
            );
          })}
        </Card>
      </div>

      <Services lat={pos.lat} lon={pos.lon} />
    </div>
  );
}

function Services({ lat, lon }: { lat: number; lon: number }) {
  const [cat, setCat] = useState("pharmacy");
  const [places, setPlaces] = useState<Place[]>([]);
  const [msg, setMsg] = useState("");
  const [hasApiKey, setHasApiKey] = useState(true); // Assume API key exists by default
  const la = lat.toFixed(3), lo = lon.toFixed(3); // search again only after about 100 m

  useEffect(() => {
    let off = false;
    setMsg("Loading...");
    setPlaces([]);
    fetch(`/api/places?lat=${la}&lon=${lo}&cat=${cat}`)
      .then((r) => r.json())
      .then((j) => {
        if (off) return;
        if (j.error) {
          setMsg("Could not load places. Try again later.");
        } else { 
          // Check if we got fallback data (IDs start with "fallback-")
          const isFallback = j.length > 0 && j[0].id?.startsWith('fallback-');
          setHasApiKey(!isFallback);
          setPlaces(j); 
          setMsg(j.length ? "" : "Nothing found within 8 km."); 
        }
      })
      .catch(() => !off && setMsg("Could not load places. Try again later."));
    return () => { off = true; };
  }, [la, lo, cat]);

  return (
    <Card>
      <h2>Services near you</h2>
      {!hasApiKey && (
        <p className="mb-3 text-sm opacity-75">
          💡 <strong>Note:</strong> Showing sample places. For accurate nearby results, add <code className="rounded bg-black/30 px-1.5 py-0.5">GEOAPIFY_API_KEY</code> to <code className="rounded bg-black/30 px-1.5 py-0.5">.env.local</code> (see <code>SETUP-API-KEY.md</code>)
        </p>
      )}
      <div className="row mb-4">
        {CATS.map(([k, l]) => (
          <button
            key={k}
            className={`chip ${cat === k ? "on" : ""}`}
            onClick={() => setCat(k)}
          >
            {l}
          </button>
        ))}
      </div>
      {msg && <p className="mb-3">{msg}</p>}
      {places.map((p) => (
        <div key={p.id} className="line">
          <span>
            {p.name}
            <br />
            <small style={{ color: "var(--mu)" }}>{p.address}</small>
          </span>
          <span className="font-semibold">
            {p.distance != null ? `${(p.distance / 1000).toFixed(1)} km` : ""}
          </span>
        </div>
      ))}
    </Card>
  );
}
