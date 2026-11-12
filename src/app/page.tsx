"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DESTS, KIND_BG } from "@/lib/destinations";
import { describe, Wx } from "@/lib/weather";
import { useWeather } from "@/lib/weather-context";
import { useExchange } from "@/lib/exchange-context";
import { addDest, tripKm, stops, usePlan } from "@/lib/plan";
import { buildPacking } from "@/lib/packing";
import { weatherAlerts } from "@/lib/alerts";
import { fmtDate, lkr } from "@/lib/geo";
import { Bar, Card, Ring } from "@/components/ui";
import TravelMap from "@/components/TravelMap";

function SriLankaDate() {
  const [now, setNow] = useState<string>("");
  
  useEffect(() => {
    function tick() {
      setNow(
        new Date().toLocaleDateString("en-GB", {
          timeZone: "Asia/Colombo",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);
  
  return now ? (
    <p className="text-sm font-medium">{now} — Sri Lanka time</p>
  ) : null;
}

export default function Dashboard() {
  const [i, setI] = useState(0);
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const d = DESTS[i];
  const { wx } = useWeather();
  const { plan, update } = usePlan();
  const { rates, loading: ratesLoading, error: ratesError } = useExchange();
  const w = wx[d.id] as Wx | undefined;
  const info = w ? describe(w.code) : null;
  const fav = plan.favs.includes(d.id);
  const s = stops(plan);
  const list = buildPacking(plan, wx);
  const done = list.filter((x) => plan.packed[x]).length;
  const packedPct = list.length ? Math.round((done / list.length) * 100) : 0;
  const spent = plan.expenses.reduce((a, e) => a + e.amount, 0);
  const alerts = weatherAlerts(wx);
  const go = (n: number) => setI((i + n + DESTS.length) % DESTS.length);

  // Currency slideshow data
  const currencies = [
    { code: 'USD', flag: '🇺🇸', rate: rates.USD, name: 'US Dollar' },
    { code: 'EUR', flag: '🇪🇺', rate: rates.EUR, name: 'Euro' },
    { code: 'GBP', flag: '🇬🇧', rate: rates.GBP, name: 'British Pound' },
    { code: 'AUD', flag: '🇦🇺', rate: rates.AUD, name: 'Australian Dollar' },
  ];

  // Auto-rotate currency every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrencyIndex((prev) => (prev + 1) % currencies.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr_1fr]">
      <Card
        className="relative flex min-h-[420px] flex-col justify-end overflow-hidden !p-0 lg:row-span-2"
      >
        {/* Background layer - Image or Gradient */}
        <div 
          className="absolute inset-0 z-[1]"
          style={d.image ? { 
            backgroundImage: `url(${d.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#1a4a3a'
          } : {
            background: KIND_BG[d.kind],
          }}
        >
          {d.image && (
            <div 
              className="absolute inset-0 flex items-center justify-center text-white/20"
              style={{ 
                background: KIND_BG[d.kind],
                zIndex: 0 
              }}
            >
              <span className="text-6xl">{d.icon}</span>
            </div>
          )}
        </div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        
        {/* Location badge - Top Left */}
        <div className="absolute left-5 top-5 z-[30]">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/70 px-4 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md">
            <span>📍</span>
            <span>{d.name}, Sri Lanka</span>
          </span>
        </div>
        
        {/* Navigation buttons - Top Right */}
        <div className="absolute right-5 top-5 z-[30] flex items-center gap-2">
          <button
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/70 text-2xl leading-none text-white shadow-xl backdrop-blur-md transition-all hover:bg-black/90 hover:scale-110 active:scale-95"
            onClick={() => go(-1)}
            aria-label="Previous place"
            title="Previous destination"
          >
            <span className="mt-[-2px]">‹</span>
          </button>
          <button
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/70 text-2xl leading-none text-white shadow-xl backdrop-blur-md transition-all hover:bg-black/90 hover:scale-110 active:scale-95"
            onClick={() => go(1)}
            aria-label="Next place"
            title="Next destination"
          >
            <span className="mt-[-2px]">›</span>
          </button>
        </div>
        
        {/* Content at bottom */}
        <div className="relative z-[40] p-6">
          <h1 className="mb-3 text-white drop-shadow-2xl pointer-events-none">
            {d.icon} {d.name}
          </h1>
          <p className="mb-5 max-w-[50ch] text-lg leading-relaxed text-white/95 drop-shadow-xl pointer-events-none">
            {d.blurb}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/70 text-2xl text-white shadow-xl backdrop-blur-md transition-all hover:bg-black/90 hover:scale-110 active:scale-95"
              aria-label={fav ? "Remove from favourites" : "Add to favourites"}
              title={fav ? "Remove from favourites" : "Add to favourites"}
              onClick={() =>
                update((p) => ({
                  ...p,
                  favs: fav ? p.favs.filter((x) => x !== d.id) : [...p.favs, d.id],
                }))
              }
            >
              {fav ? "★" : "☆"}
            </button>
            <button
              className="btn btn-p px-6 py-3 text-base font-bold shadow-xl"
              onClick={() => update((p) => addDest(p, d))}
            >
              Add to trip
            </button>
            <Link href="/trip" className="btn border-white/30 bg-white/25 px-6 py-3 text-base font-semibold text-white shadow-xl backdrop-blur-md hover:bg-white/35">
              Plan your trip
            </Link>
          </div>
        </div>
      </Card>

      <Card className="cream">
        <h2>🌤 Weather in {d.name}</h2>
        {w && info ? (
          <>
            <div className="mb-2 text-[48px] font-light leading-none">
              {w.temp}°C
            </div>
            <p className="mb-3">
              {info.icon} {info.text}. Rain chance {w.rain}%. Wind {w.wind} km/h.
              Humidity {w.humidity}%.
            </p>
            <div className="fc">
              {w.days.slice(0, 5).map((x) => (
                <div key={x.date}>
                  {fmtDate(x.date).split(",")[0]}
                  <br />
                  {describe(x.code).icon}
                  <br />
                  {x.hi}°/{x.lo}°
                </div>
              ))}
            </div>
            <p className="mt-3">
              <Link href="/weather" className="font-semibold underline">
                See the full 7-day forecast
              </Link>
            </p>
          </>
        ) : (
          <p>Loading live weather...</p>
        )}
      </Card>

      <Card className="pink">
        <h2>🧳 {plan.name}</h2>
        <p className="mb-2">
          {plan.days} days, {plan.items.length} planned items.
        </p>
        <p className="mb-4">
          {s.length > 1
            ? `Route: ${s[0].name} to ${s[s.length - 1].name}, about ${tripKm(
                plan
              )} km.`
            : "Add two or more places to see your route length."}
        </p>
        <Link href="/trip" className="btn">
          Open itinerary
        </Link>
      </Card>

      <Card className="lg:col-span-2">
        <h2>Destinations on the map</h2>
        <TravelMap
          pins={DESTS.map((x) => ({
            id: x.id,
            lat: x.lat,
            lon: x.lon,
            label: x.name,
            r: x.id === d.id ? 9 : 6,
            color: x.id === d.id ? "#f58220" : "#ffffff",
          }))}
          onPick={(id) => setI(DESTS.findIndex((x) => x.id === id))}
        />
      </Card>

      <Card>
        <h2>Favourite places</h2>
        {plan.favs.length ? (
          <>
            <div className="mb-3 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]">
              {plan.favs.slice(0, 3).map((id) => {
                const f = DESTS.find((x) => x.id === id);
                if (!f) return null;
                const fw = wx[id] as Wx | undefined;
                return (
                  <button
                    key={id}
                    className="rounded-2xl p-3 text-left font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: KIND_BG[f.kind] }}
                    onClick={() => setI(DESTS.indexOf(f))}
                  >
                    {f.icon} {f.name}
                    <br />
                    <small className="font-normal">
                      {fw ? `${fw.temp}°C` : ""} {f.kind}
                    </small>
                  </button>
                );
              })}
            </div>
            <p>
              <Link
                href="/explore"
                className="font-semibold"
                style={{ color: "var(--o)" }}
              >
                Explore all {DESTS.length} places
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="mb-3">Tap ☆ on a place to save it here.</p>
            <p>
              <Link
                href="/explore"
                className="font-semibold"
                style={{ color: "var(--o)" }}
              >
                Explore all {DESTS.length} places
              </Link>
            </p>
          </>
        )}
      </Card>

      <Card className="lg:col-span-2">
        <h2>Your progress</h2>
        <div className="mb-4 flex flex-wrap justify-around gap-4">
          <Ring
            pct={100}
            value={DESTS.length}
            label="Places to explore"
          />
          <Ring
            pct={(plan.favs.length / DESTS.length) * 100}
            value={plan.favs.length}
            label="Favourites"
          />
          <Ring pct={packedPct} value={`${packedPct}%`} label="Packed" />
        </div>
        <p className="mb-2">
          Budget used: {lkr(spent)} of {lkr(plan.budget)}
        </p>
        <Bar pct={plan.budget > 0 ? (spent / plan.budget) * 100 : 0} />
        <p className="mt-3">
          {alerts.length ? (
            <Link
              href="/alerts"
              className="font-semibold"
              style={{ color: "var(--o)" }}
            >
              {alerts.length} weather alert{alerts.length > 1 ? "s" : ""} for the
              next 3 days
            </Link>
          ) : (
            "No weather alerts for the next 3 days."
          )}
        </p>
      </Card>

      {/* Real-time data: date, exchange rates - Single currency slideshow */}
      <Card className="lg:col-span-3">
        <h2>📊 Real-time information</h2>
        <SriLankaDate />
        
        {ratesLoading ? (
          <div className="mt-3">
            <p>Loading live exchange rates...</p>
          </div>
        ) : (
          <div className="mt-3">
            <div className="relative overflow-hidden rounded-xl p-6 text-center" style={{ background: "rgba(0, 0, 0, 0.2)", minHeight: "120px" }}>
              {currencies.map((currency, idx) => (
                <div
                  key={currency.code}
                  className="transition-all duration-500"
                  style={{
                    opacity: currencyIndex === idx ? 1 : 0,
                    transform: currencyIndex === idx ? 'scale(1)' : 'scale(0.9)',
                    position: currencyIndex === idx ? 'relative' : 'absolute',
                    top: currencyIndex === idx ? 'auto' : '50%',
                    left: currencyIndex === idx ? 'auto' : '50%',
                    right: 0,
                    pointerEvents: currencyIndex === idx ? 'auto' : 'none',
                  }}
                >
                  <div className="mb-2 text-4xl">{currency.flag}</div>
                  <div className="mb-1 text-sm font-medium opacity-75">
                    1 {currency.code} = LKR
                  </div>
                  <div className="text-4xl font-bold" style={{ color: "var(--o)" }}>
                    {currency.rate.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs opacity-60">{currency.name}</div>
                </div>
              ))}
            </div>
            
            {/* Currency indicators */}
            <div className="mt-3 flex justify-center gap-2">
              {currencies.map((currency, idx) => (
                <button
                  key={currency.code}
                  onClick={() => setCurrencyIndex(idx)}
                  className="h-2 w-2 rounded-full transition-all"
                  style={{
                    background: currencyIndex === idx ? 'var(--o)' : 'var(--mu)',
                    opacity: currencyIndex === idx ? 1 : 0.4,
                    transform: currencyIndex === idx ? 'scale(1.3)' : 'scale(1)',
                  }}
                  aria-label={`Show ${currency.code} rate`}
                />
              ))}
            </div>
          </div>
        )}
        
        {ratesError && (
          <p className="mt-2 text-xs opacity-75">
            ℹ️ Showing approximate rates (live rates temporarily unavailable)
          </p>
        )}
        {!ratesError && rates.time && (
          <p className="mt-2 text-xs opacity-75">
            ✓ Live rates updated {rates.time.toLocaleTimeString()} • Changes every 3 seconds
          </p>
        )}
      </Card>
    </div>
  );
}
