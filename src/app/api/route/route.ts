import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const pair = (s: string | null) => {
  const [a, b] = (s || "").split(",").map(Number);
  return isFinite(a) && isFinite(b) ? ([a, b] as [number, number]) : null; // [lat, lon]
};

/** Road distance, time and line. Uses Geoapify if a key is set, else the free OSRM server. */
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const from = pair(p.get("from"));
  const to = pair(p.get("to"));
  if (!from || !to) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const key = process.env.GEOAPIFY_API_KEY;
  if (key) {
    try {
      const url = `https://api.geoapify.com/v1/routing?waypoints=${from[0]},${from[1]}|${to[0]},${to[1]}&mode=drive&apiKey=${key}`;
      const r = await fetch(url, { next: { revalidate: 3600 } });
      if (r.ok) {
        const f = (await r.json()).features[0];
        const g = f.geometry;
        const coords: number[][] = g.type === "MultiLineString" ? g.coordinates.flat() : g.coordinates;
        return NextResponse.json({
          km: Math.round(f.properties.distance / 1000),
          seconds: f.properties.time,
          line: coords.map((c) => [c[1], c[0]]),
          source: "Geoapify",
        });
      }
    } catch {}
  }

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=simplified&geometries=geojson`;
    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (!r.ok) throw new Error("osrm");
    const o = (await r.json()).routes[0];
    return NextResponse.json({
      km: Math.round(o.distance / 1000),
      seconds: o.duration,
      line: o.geometry.coordinates.map((c: number[]) => [c[1], c[0]]),
      source: "OSRM",
    });
  } catch {
    return NextResponse.json({ error: "service" }, { status: 502 });
  }
}
