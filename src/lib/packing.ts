import { byId, DESTS, Kind } from "./destinations";
import type { Plan } from "./plan";
import type { Wx } from "./weather";

/** Builds a packing list from the trip places, live weather and chosen activities. */
export function buildPacking(plan: Plan, wx: Record<string, Wx>): string[] {
  const ids = Array.from(new Set(plan.items.filter((i) => i.dest).map((i) => i.dest as string)));
  const places = ids.map((id) => byId(id)).filter((d): d is NonNullable<typeof d> => !!d);
  const kinds = new Set<Kind>([...plan.activities, ...places.map((p) => p.kind)]);
  const ws = places.map((p) => wx[p.id] as Wx | undefined).filter((w): w is Wx => !!w);

  const L = [
    "Passport and ETA",
    "Phone and charger",
    "Power adapter (Type D or G)",
    "Water bottle",
    "Sunscreen",
    "Insect repellent",
    "First aid and personal medicines",
    "Cash (LKR) and bank card",
  ];
  if (ws.some((w) => w.rain >= 50 || w.days.some((d) => d.rain >= 60))) L.push("Light rain jacket", "Quick-dry clothes");
  if (ws.some((w) => w.temp < 20)) L.push("Warm jacket", "Long trousers");
  if (ws.some((w) => w.temp >= 31)) L.push("Light cotton clothes", "Hat or cap");
  if (kinds.has("Beach")) L.push("Swimwear", "Beach towel", "Flip-flops");
  if (kinds.has("Hills")) L.push("Warm layer for cool nights", "Closed walking shoes");
  if (kinds.has("History")) L.push("Modest clothes (cover shoulders and knees)", "Easy slip-off shoes for temples");
  if (kinds.has("Wildlife")) L.push("Binoculars", "Neutral-colour clothes");
  if (plan.days > 5) L.push("Laundry bag");
  return Array.from(new Set(L));
}
export { DESTS };
