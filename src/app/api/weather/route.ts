import { NextResponse } from "next/server";
import { DESTS } from "@/lib/destinations";
import type { Wx } from "@/lib/weather";

export const dynamic = "force-dynamic";

/** Live weather for all destinations from Open-Meteo (no API key needed). */
export async function GET() {
  const u = new URL("https://api.open-meteo.com/v1/forecast");
  u.searchParams.set("latitude", DESTS.map((d) => d.lat).join(","));
  u.searchParams.set("longitude", DESTS.map((d) => d.lon).join(","));
  u.searchParams.set("current", "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m");
  u.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,uv_index_max,sunrise,sunset");
  u.searchParams.set("hourly", "temperature_2m,precipitation_probability,weather_code");
  u.searchParams.set("forecast_hours", "24");
  u.searchParams.set("timezone", "Asia/Colombo");
  u.searchParams.set("forecast_days", "7");

  try {
    const r = await fetch(u, { next: { revalidate: 600 } });
    if (!r.ok) return NextResponse.json({ error: "Weather service error" }, { status: 502 });
    const j = await r.json();

    // Open-Meteo returns an array when multiple lat/lons are given,
    // but a single object when only one location is requested.
    const arr: any[] = Array.isArray(j) ? j : [j];

    if (arr.length !== DESTS.length) {
      // Safety: if the API returned fewer items than expected, bail gracefully
      return NextResponse.json({ error: "Unexpected weather response length" }, { status: 502 });
    }

    const out: Wx[] = arr.map((x: any, i: number) => {
      try {
        return {
          id: DESTS[i].id,
          temp: Math.round(x.current.temperature_2m),
          feels: Math.round(x.current.apparent_temperature),
          code: x.current.weather_code,
          humidity: x.current.relative_humidity_2m,
          wind: Math.round(x.current.wind_speed_10m),
          rain: x.daily.precipitation_probability_max?.[0] ?? 0,
          time: x.current.time,
          days: (x.daily.time ?? []).map((date: string, k: number) => ({
            date,
            hi: Math.round(x.daily.temperature_2m_max[k]),
            lo: Math.round(x.daily.temperature_2m_min[k]),
            rain: x.daily.precipitation_probability_max?.[k] ?? 0,
            code: x.daily.weather_code[k],
            mm: Math.round((x.daily.precipitation_sum?.[k] ?? 0) * 10) / 10,
            windMax: Math.round(x.daily.wind_speed_10m_max?.[k] ?? 0),
            uv: Math.round((x.daily.uv_index_max?.[k] ?? 0) * 10) / 10,
            sunrise: x.daily.sunrise?.[k] ?? "",
            sunset: x.daily.sunset?.[k] ?? "",
          })),
          hours: (x.hourly?.time ?? []).map((time: string, k: number) => ({
            time,
            temp: Math.round(x.hourly.temperature_2m[k]),
            rain: x.hourly.precipitation_probability?.[k] ?? 0,
            code: x.hourly.weather_code[k],
          })),
        };
      } catch {
        // If a single location fails, return a placeholder
        return {
          id: DESTS[i].id,
          temp: 0, feels: 0, code: -1, humidity: 0, wind: 0, rain: 0,
          time: "", days: [], hours: [],
        };
      }
    });

    return NextResponse.json(out, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json({ error: "Weather service not reachable" }, { status: 502 });
  }
}
