"use client";
import { useState } from "react";
import { byId, DESTS } from "@/lib/destinations";
import { tripKm, uid, usePlan } from "@/lib/plan";
import { Card } from "@/components/ui";

export default function Trip() {
  const { plan, update, cloud } = usePlan();
  const [day, setDay] = useState(0);
  const [dest, setDest] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");

  function add() {
    const d = dest ? byId(dest) : undefined;
    const text = note.trim() || (d ? "Visit " + d.name : "");
    if (!text) return setMsg("Write an activity or choose a place.");
    update((p) => ({
      ...p,
      items: [...p.items, { id: uid(), day, text, dest: d?.id }],
    }));
    setNote("");
    setMsg("");
  }

  function planText() {
    const lines = [plan.name];
    for (let d = 0; d < plan.days; d++) {
      lines.push(`Day ${d + 1}`);
      plan.items
        .filter((i) => i.day === d)
        .forEach((i) => lines.push(`- ${i.text}`));
    }
    return lines.join("\n");
  }
  
  async function copy() {
    try {
      await navigator.clipboard.writeText(planText());
      setMsg("Plan copied. Paste it in a message to share.");
    } catch {
      setMsg("Could not copy. Use Print or PDF instead.");
    }
  }

  return (
    <div className="grid gap-5">
      <Card>
        <h1>Itinerary planner</h1>
        <div className="row mb-4">
          <input
            className="inp flex-1"
            value={plan.name}
            onChange={(e) => update((p) => ({ ...p, name: e.target.value }))}
            aria-label="Trip name"
          />
          <label className="row">
            <span className="font-semibold">Days</span>
            <input
              className="inp w-24"
              type="number"
              min={1}
              max={14}
              value={plan.days}
              onChange={(e) =>
                update((p) => ({
                  ...p,
                  days: Math.max(1, Math.min(14, Number(e.target.value) || 1)),
                }))
              }
            />
          </label>
        </div>
        
        <div className="row noprint mb-4">
          <select
            className="inp flex-1"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            aria-label="Day"
          >
            {Array.from({ length: plan.days }, (_, i) => (
              <option key={i} value={i}>
                Day {i + 1}
              </option>
            ))}
          </select>
          <select
            className="inp flex-1"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            aria-label="Place"
          >
            <option value="">No place</option>
            {DESTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <input
            className="inp flex-1 min-w-[180px]"
            placeholder="Activity, e.g. Sunrise hike"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            aria-label="Activity"
          />
          <button className="btn btn-p" onClick={add}>
            Add
          </button>
        </div>
        
        <div className="row noprint mb-3">
          <button className="btn" onClick={() => window.print()}>
            Print or save as PDF
          </button>
          <button className="btn" onClick={copy}>
            Copy plan
          </button>
          <span className="live">
            <i />
            {cloud
              ? "Saved to your account"
              : "Saved in this browser. Log in to save online."}
          </span>
        </div>
        
        <p>
          Planned route: about {tripKm(plan)} km in total (estimate). {msg}
        </p>
      </Card>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
        {Array.from({ length: plan.days }, (_, d) => {
          const items = plan.items.filter((i) => i.day === d);
          return (
            <Card key={d}>
              <h2>Day {d + 1}</h2>
              {items.length === 0 && <p>Nothing planned yet.</p>}
              {items.map((i) => (
                <div key={i.id} className="line">
                  <span>
                    {i.dest ? byId(i.dest)?.icon + " " : ""}
                    {i.text}
                  </span>
                  <button
                    className="btn btn-sm noprint"
                    aria-label={`Remove ${i.text}`}
                    onClick={() =>
                      update((p) => ({
                        ...p,
                        items: p.items.filter((x) => x.id !== i.id),
                      }))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
