import { DESTS } from "./destinations";
import { fmtDate } from "./geo";
import type { Wx } from "./weather";

export interface Alert { id: string; place: string; level: "warn" | "info"; text: string }

/** Simple alerts made from the live 3-day forecast. */
export function weatherAlerts(wx: Record<string, Wx>): Alert[] {
  const out: Alert[] = [];
  for (const d of DESTS) {
    const w = wx[d.id] as Wx | undefined;
    if (!w) continue;
    const next = w.days.slice(0, 3);
    const storm = next.find((x) => x.code >= 95);
    const rain = next.find((x) => x.rain >= 70);
    const hot = next.find((x) => x.hi >= 34);
    if (storm) out.push({ id: d.id + "-s", place: d.name, level: "warn", text: `Thunderstorms are possible on ${fmtDate(storm.date)}.` });
    else if (rain) out.push({ id: d.id + "-r", place: d.name, level: "info", text: `Heavy rain is likely on ${fmtDate(rain.date)} (${rain.rain}% chance).` });
    if (hot) out.push({ id: d.id + "-h", place: d.name, level: "info", text: `Very hot on ${fmtDate(hot.date)} (up to ${hot.hi}°C). Drink water often.` });
  }
  return out;
}
