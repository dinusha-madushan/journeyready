"use client";
import { useState } from "react";
import { lkr } from "@/lib/geo";
import { uid, usePlan } from "@/lib/plan";
import { Bar, Card, Ring } from "@/components/ui";

const CATS = ["Stay", "Food", "Transport", "Tickets", "Other"];

export default function Budget() {
  const { plan, update } = usePlan();
  const [label, setLabel] = useState("");
  const [cat, setCat] = useState(CATS[0]);
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const spent = plan.expenses.reduce((a, e) => a + e.amount, 0);
  const left = plan.budget - spent;
  const pct = (spent / plan.budget) * 100;
  const byCat: Record<string, number> = {};
  plan.expenses.forEach((e) => (byCat[e.cat] = (byCat[e.cat] || 0) + e.amount));

  function add() {
    const a = Number(amount);
    if (!label.trim() || !(a > 0)) return setMsg("Add a name and an amount.");
    update((p) => ({
      ...p,
      expenses: [
        ...p.expenses,
        { id: uid(), label: label.trim(), cat, amount: a },
      ],
    }));
    setLabel("");
    setAmount("");
    setMsg("");
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card>
        <h1>Budget planner</h1>
        <label className="row mb-4">
          <span className="font-semibold">Total budget (LKR)</span>
          <input
            className="inp flex-1"
            type="number"
            min={1}
            value={plan.budget}
            onChange={(e) =>
              update((p) => ({
                ...p,
                budget: Math.max(1, Number(e.target.value) || 1),
              }))
            }
          />
        </label>
        
        <div className="mb-5 flex flex-wrap items-center gap-6">
          <Ring pct={pct} value={`${Math.round(pct)}%`} label="Spent" />
          <div>
            <p className="mb-1">Spent</p>
            <div className="kpi mb-2">{lkr(spent)}</div>
            <p>{left >= 0 ? `Left: ${lkr(left)}` : `Over budget by ${lkr(-left)}`}</p>
          </div>
        </div>
        
        <div className="row mb-3">
          <input
            className="inp flex-1 min-w-[140px]"
            placeholder="What did you buy?"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            aria-label="Expense name"
          />
          <select
            className="inp"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            aria-label="Category"
          >
            {CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            className="inp w-32"
            type="number"
            min={0}
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="Amount"
          />
          <button className="btn btn-p" onClick={add}>
            Add
          </button>
        </div>
        {msg && <p>{msg}</p>}
      </Card>
      
      <Card>
        <h2>Expenses</h2>
        {plan.expenses.length === 0 && (
          <p>No expenses yet. Add your first one.</p>
        )}
        {plan.expenses.map((e) => (
          <div key={e.id} className="line">
            <span>
              {e.label}{" "}
              <small style={{ color: "var(--mu)" }}>{e.cat}</small>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-semibold">{lkr(e.amount)}</span>
              <button
                className="btn btn-sm"
                aria-label={`Remove ${e.label}`}
                onClick={() =>
                  update((p) => ({
                    ...p,
                    expenses: p.expenses.filter((x) => x.id !== e.id),
                  }))
                }
              >
                ✕
              </button>
            </span>
          </div>
        ))}
        {Object.keys(byCat).length > 0 && <div className="mt-4 border-t border-[var(--ln)] pt-4">
          <h3 className="mb-3 text-sm font-semibold">By category</h3>
          {Object.keys(byCat).map((c) => (
            <div key={c} className="mb-3">
              <p className="mb-1 font-medium">{c}: {lkr(byCat[c])}</p>
              <Bar pct={spent > 0 ? (byCat[c] / spent) * 100 : 0} />
            </div>
          ))}
        </div>}
      </Card>
    </div>
  );
}
