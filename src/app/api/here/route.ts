import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function reverse(lat: number, lon: number): Promise<string | null> {
  const key = process.env.GEOAPIFY_API_KEY;
  if (key) {
    try {
      const r = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${key}`);
      if (r.ok) {
        const p = (await r.json()).results?.[0];
        if (p?.formatted) return p.formatted as string;
      }
    } catch {}
  }
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=16`, {
      headers: { "User-Agent": "JourneyReady student project", "Accept-Language": "en" },
    });
    if (r.ok) return ((await r.json()).display_name as string) || null;
  } catch {}
  return null;
}

async function weather(lat: number, lon: number) {
  try {
    const u = new URL("https://api.open-meteo.com/v1/forecast");
    u.searchParams.set("latitude", String(lat));
    u.searchParams.set("longitude", String(lon));
    u.searchParams.set("current", "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m");
    u.searchParams.set("daily", "precipitation_probability_max,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max");
    u.searchParams.set("timezone", "auto");
    u.searchParams.set("forecast_days", "1");
    const r = await fetch(u);
    if (!r.ok) return null;
    const x = await r.json();
    return {
      temp: Math.round(x.current.temperature_2m),
      feels: Math.round(x.current.apparent_temperature),
      code: x.current.weather_code as number,
      humidity: x.current.relative_humidity_2m as number,
      wind: Math.round(x.current.wind_speed_10m),
      rain: (x.daily.precipitation_probability_max?.[0] ?? 0) as number,
      hi: Math.round(x.daily.temperature_2m_max[0]),
      lo: Math.round(x.daily.temperature_2m_min[0]),
      uv: x.daily.uv_index_max?.[0] ?? 0,
      sunrise: (x.daily.sunrise?.[0] ?? "") as string,
      sunset: (x.daily.sunset?.[0] ?? "") as string,
    };
  } catch {
    return null;
  }
}

/** Address and weather for the person's current spot. Nothing is stored. */
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const lat = Number(p.get("lat"));
  const lon = Number(p.get("lon"));
  if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const la = Math.round(lat * 1e4) / 1e4;
  const lo = Math.round(lon * 1e4) / 1e4;
  const [place, wx] = await Promise.all([reverse(la, lo), weather(la, lo)]);
  return NextResponse.json({ place, weather: wx });
}
