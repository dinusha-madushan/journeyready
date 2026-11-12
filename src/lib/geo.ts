interface Pt { lat: number; lon: number }
const rad = (d: number) => (d * Math.PI) / 180;

export function distKm(a: Pt, b: Pt) {
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}
/** Straight line x 1.35 is a simple road estimate. Real routes come from /api/route. */
export const roadEstimate = (a: Pt, b: Pt) => Math.round(distKm(a, b) * 1.35);
export const fmtTime = (sec: number) => {
  const m = Math.round(sec / 60);
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};
export const lkr = (n: number) => "LKR " + Math.round(n).toLocaleString("en-US");
export const fmtDate = (s: string) =>
  new Date(s + "T12:00").toLocaleDateString("en", { weekday: "short", day: "numeric", month: "short" });
