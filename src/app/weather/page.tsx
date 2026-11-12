"use client";
import { useState } from "react";
import { byId, DESTS } from "@/lib/destinations";
import { fmtDate } from "@/lib/geo";
import { describe, Wx } from "@/lib/weather";
import { useWeather } from "@/lib/weather-context";
import { Card } from "@/components/ui";

const hourLabel = (t: string) => new Date(t).toLocaleTimeString([], { hour: "numeric" });

export default function WeatherPage() {
  const [id, setId] = useState("colombo");
  const { wx, updated, error } = useWeather();
  const d = byId(id)!;
  const w = wx[id] as Wx | undefined;

  return (
    <div className="grid gap-5">
      <Card>
        <h1>Weather forecast</h1>
        <div className="row">
          <select
            className="inp flex-1"
            value={id}
            onChange={(e) => setId(e.target.value)}
            aria-label="Place"
          >
            {DESTS.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
          {updated && (
            <span className="live">
              <i />
              Updated{" "}
              {updated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
        {error && !w && (
          <p className="mt-3">
            Live weather is not available now. Check your internet and try again.
          </p>
        )}
        {!error && !w && <p className="mt-3">Loading live weather...</p>}
      </Card>

      {w && <Details w={w} name={d.name} />}
    </div>
  );
}

function Details({ w, name }: { w: Wx; name: string }) {
  const now = describe(w.code);
  const today = w.days[0];
  const lowest = Math.min(...w.days.map((x) => x.lo));
  const highest = Math.max(...w.days.map((x) => x.hi));
  const span = Math.max(1, highest - lowest);
  const driest = w.days.reduce((a, b) => (b.rain < a.rain ? b : a));
  const wet = w.days.find((x) => x.rain >= 60);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="cream">
          <h2>Now in {name}</h2>
          <div className="mb-3 text-[56px] font-light leading-none">
            {w.temp}°C
          </div>
          <p className="mb-2">
            {now.icon} {now.text}. Feels like {w.feels}°C.
          </p>
          <p className="mb-2">
            Humidity {w.humidity}%. Wind {w.wind} km/h. Rain chance today{" "}
            {w.rain}%.
          </p>
          {today && (
            <p>
              Sunrise {today.sunrise.slice(11, 16)}. Sunset{" "}
              {today.sunset.slice(11, 16)}. UV index up to {today.uv}.
            </p>
          )}
        </Card>
        
        <Card>
          <h2>Trip tips</h2>
          <p className="mb-3">
            {wet
              ? `☂️ Take an umbrella. Rain is likely on ${fmtDate(wet.date)} (${
                  wet.rain
                }%).`
              : "☀️ No heavy rain expected in the next 7 days."}
          </p>
          <p className="mb-3">
            🗓 Driest day: {fmtDate(driest.date)} ({driest.rain}% rain chance).
          </p>
          {w.days.some((x) => x.uv >= 8) && (
            <p className="mb-3">
              🧴 UV is very high on some days. Use sunscreen and a hat.
            </p>
          )}
          {w.days.some((x) => x.hi >= 34) && (
            <p>🥤 Very hot days ahead. Drink water often.</p>
          )}
        </Card>
      </div>

      <Card>
        <h2>Next 24 hours</h2>
        <div className="mb-3 flex gap-3 overflow-x-auto pb-2">
          {w.hours
            .filter((_, i) => i % 2 === 0)
            .map((h) => (
              <div
                key={h.time}
                className="min-w-[70px] rounded-2xl p-3 text-center text-sm"
                style={{ background: "var(--in)" }}
              >
                <div className="mb-1">{hourLabel(h.time)}</div>
                <div className="my-2 text-2xl">{describe(h.code).icon}</div>
                <b className="block text-base">{h.temp}°</b>
                <div className="mt-1 text-xs" style={{ color: "var(--mu)" }}>
                  {h.rain}%
                </div>
              </div>
            ))}
        </div>
        <p className="text-xs" style={{ color: "var(--mu)" }}>
          Every 2 hours. The small number is the rain chance.
        </p>
      </Card>

      <Card>
        <h2>Next 7 days</h2>
        {w.days.map((x, i) => {
          const info = describe(x.code);
          return (
            <div
              key={x.date}
              className="line flex-wrap !justify-start gap-x-4 gap-y-2"
            >
              <span className="w-24 font-semibold">
                {i === 0 ? "Today" : fmtDate(x.date)}
              </span>
              <span className="w-40">
                {info.icon} {info.text}
              </span>
              <span
                className="flex w-52 items-center gap-2"
                aria-label={`Low ${x.lo}, high ${x.hi}`}
              >
                <span className="w-9 text-right">{x.lo}°</span>
                <span
                  className="relative h-2 flex-1 rounded-full"
                  style={{ background: "var(--ln)" }}
                >
                  <span
                    className="absolute h-2 rounded-full bg-brand-orange"
                    style={{
                      left: `${((x.lo - lowest) / span) * 100}%`,
                      width: `${Math.max(6, ((x.hi - x.lo) / span) * 100)}%`,
                    }}
                  />
                </span>
                <span className="w-9">{x.hi}°</span>
              </span>
              <span className="w-20">🌧 {x.rain}%</span>
              <span className="w-20">{x.mm} mm</span>
              <span className="w-24">💨 {x.windMax} km/h</span>
              <span className="w-16">UV {x.uv}</span>
            </div>
          );
        })}
      </Card>
    </>
  );
}
