"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { byId, DESTS } from "@/lib/destinations";
import { fmtTime, roadEstimate } from "@/lib/geo";
import { useLocation } from "@/lib/location";
import { Card } from "@/components/ui";
import TravelMap from "@/components/TravelMap";

interface Res { km: number; seconds: number; line: [number, number][]; source: string }
interface P { id: string; name: string; lat: number; lon: number }

export default function Routes() {
  return (
    <Suspense fallback={<Card><p>Loading...</p></Card>}>
      <RoutesInner />
    </Suspense>
  );
}

function RoutesInner() {
  const sp = useSearchParams();
  const { pos, status, start } = useLocation();
  const [a, setA] = useState(sp.get("from") || "colombo");
  const [b, setB] = useState(sp.get("to") || "sigiriya");
  const [r, setR] = useState<Res | null>(null);
  const [err, setErr] = useState("");

  // "My location" is the live position, rounded to about 100 m so we do not ask the server on every GPS update.
  const A: P | undefined = a === "me" ? (pos ? { id: "me", name: "My location", lat: pos.lat, lon: pos.lon } : undefined) : byId(a);
  const B = byId(b)!;
  const key = a === "me" && pos ? `${pos.lat.toFixed(3)},${pos.lon.toFixed(3)}` : "";

  // Stable coordinates for the effect dependency array
  const aLat = A?.lat;
  const aLon = A?.lon;
  const bLat = B?.lat;
  const bLon = B?.lon;

  useEffect(() => { if (a === "me" && status === "idle") start(); }, [a, status, start]);

  useEffect(() => {
    setR(null);
    setErr("");
    if (aLat == null || aLon == null || bLat == null || bLon == null || a === b) return;
    let off = false;
    fetch(`/api/route?from=${aLat},${aLon}&to=${bLat},${bLon}`)
      .then((x) => x.json())
      .then((j) => { if (!off) j.error ? setErr("Live route data is not available now.") : setR(j); })
      .catch(() => !off && setErr("Live route data is not available now."));
    return () => { off = true; };
  }, [a, b, aLat, aLon, bLat, bLon, key]);

  const opts = DESTS.map((d) => (
    <option key={d.id} value={d.id}>
      {d.name}
    </option>
  ));
  
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card>
        <h1>Routes</h1>
        <div className="row mb-4">
          <select
            className="inp flex-1"
            value={a}
            onChange={(e) => setA(e.target.value)}
            aria-label="From"
          >
            <option value="me">📍 My location</option>
            {opts}
          </select>
          <span className="font-semibold">to</span>
          <select
            className="inp flex-1"
            value={b}
            onChange={(e) => setB(e.target.value)}
            aria-label="To"
          >
            {opts}
          </select>
        </div>
        
        <div>
          {a === "me" && !A ? (
            <p>
              {status === "denied"
                ? "Location is blocked. Allow it in your browser, or pick a place instead."
                : "Waiting for your location..."}
            </p>
          ) : !A || a === b ? (
            <p>Choose two different places.</p>
          ) : r ? (
            <>
              <p className="mb-2">Road distance (from {r.source})</p>
              <div className="kpi mb-3">{r.km} km</div>
              <p>About {fmtTime(r.seconds)} by car, without traffic.</p>
            </>
          ) : (
            <>
              <p className="mb-2">Estimated distance</p>
              <div className="kpi mb-3">{roadEstimate(A, B)} km</div>
              <p>{err || "Checking live route data..."}</p>
            </>
          )}
        </div>
      </Card>
      
      <Card>
        <h2 className="mb-4">Route on map</h2>
        <TravelMap
          line={r?.line}
          me={a === "me" && pos ? { lat: pos.lat, lon: pos.lon, acc: pos.acc } : null}
          pins={[...(A && a !== "me" ? [A] : []), B].map((d) => ({
            id: d.id,
            lat: d.lat,
            lon: d.lon,
            label: d.name,
            color: "#f58220",
            r: 9,
          }))}
        />
      </Card>
    </div>
  );
}
