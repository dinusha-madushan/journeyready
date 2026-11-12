"use client";
import { KIND_LABEL, Kind } from "@/lib/destinations";
import { buildPacking } from "@/lib/packing";
import { usePlan } from "@/lib/plan";
import { useWeather } from "@/lib/weather-context";
import { Bar, Card } from "@/components/ui";

export default function Packing() {
  const { plan, update } = usePlan();
  const { wx } = useWeather();
  const list = buildPacking(plan, wx);
  const done = list.filter((x) => plan.packed[x]).length;
  const toggleKind = (k: Kind) =>
    update((p) => ({
      ...p,
      activities: p.activities.includes(k)
        ? p.activities.filter((x) => x !== k)
        : [...p.activities, k],
    }));

  return (
    <Card>
      <h1>Smart packing list</h1>
      <p className="mb-4">
        The list follows your trip places and the live weather. Choose extra
        activities to add more items.
      </p>
      
      <div className="row mb-4">
        {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
          <button
            key={k}
            className={`chip ${plan.activities.includes(k) ? "on" : ""}`}
            onClick={() => toggleKind(k)}
          >
            {KIND_LABEL[k]}
          </button>
        ))}
      </div>
      
      <p className="mb-2 font-semibold">
        {done} of {list.length} packed
      </p>
      <Bar pct={list.length ? (done / list.length) * 100 : 0} />
      
      <div className="mt-4">
        {list.map((x) => (
          <label key={x} className="line !justify-start gap-3 cursor-pointer hover:bg-white/5">
            <input
              type="checkbox"
              className="h-5 w-5 cursor-pointer accent-[#f58220]"
              checked={!!plan.packed[x]}
              onChange={(e) =>
                update((p) => ({
                  ...p,
                  packed: { ...p.packed, [x]: e.target.checked },
                }))
              }
            />
            <span>{x}</span>
          </label>
        ))}
      </div>
    </Card>
  );
}
