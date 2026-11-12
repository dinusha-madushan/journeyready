"use client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { byId, Dest, Kind } from "./destinations";
import { roadEstimate } from "./geo";
import { supabase } from "./supabase";
import { useAuth } from "./auth";

export interface Item { id: string; day: number; text: string; dest?: string }
export interface Expense { id: string; label: string; cat: string; amount: number }
export interface Plan {
  name: string;
  days: number;
  items: Item[];
  budget: number;
  expenses: Expense[];
  packed: Record<string, boolean>;
  activities: Kind[];
  favs: string[];
}

export const EMPTY: Plan = {
  name: "My Sri Lanka trip",
  days: 3,
  items: [],
  budget: 50000,
  expenses: [],
  packed: {},
  activities: [],
  favs: [],
};

export const uid = () => Math.random().toString(36).slice(2, 9);

/** Adds a place to the day that has the fewest items. */
export function addDest(p: Plan, d: Dest): Plan {
  const counts = Array.from({ length: p.days }, (_, i) => p.items.filter((x) => x.day === i).length);
  const day = counts.indexOf(Math.min(...counts));
  return { ...p, items: [...p.items, { id: uid(), day, text: "Visit " + d.name, dest: d.id }] };
}

/** Places in trip order. */
export function stops(p: Plan): Dest[] {
  return p.items
    .slice()
    .sort((a, b) => a.day - b.day)
    .map((i) => (i.dest ? byId(i.dest) : undefined))
    .filter((d): d is Dest => !!d);
}

export function tripKm(p: Plan) {
  const s = stops(p);
  let km = 0;
  for (let i = 1; i < s.length; i++) if (s[i].id !== s[i - 1].id) km += roadEstimate(s[i - 1], s[i]);
  return km;
}

interface PlanCtx { plan: Plan; update: (f: (p: Plan) => Plan) => void; cloud: boolean }
const Ctx = createContext<PlanCtx>({ plan: EMPTY, update: () => {}, cloud: false });
export const usePlan = () => useContext(Ctx);

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState<Plan>(EMPTY);
  const [ready, setReady] = useState(false);
  const [synced, setSynced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // 1. Load from this browser
  useEffect(() => {
    try {
      const s = localStorage.getItem("jr-plan");
      if (s) setPlan({ ...EMPTY, ...JSON.parse(s) });
    } catch {}
    setReady(true);
  }, []);

  // 2. When logged in, load the saved plan from Supabase
  useEffect(() => {
    setSynced(false);
    if (!ready || !user || !supabase) return;
    let off = false;
    supabase
      .from("plans")
      .select("data")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (off) return;
        if (data?.data) setPlan({ ...EMPTY, ...data.data });
        setSynced(true);
      });
    return () => {
      off = true;
    };
  }, [ready, user]);

  // 3. Save after each change (browser always, Supabase when logged in)
  useEffect(() => {
    if (!ready) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        localStorage.setItem("jr-plan", JSON.stringify(plan));
      } catch {}
      if (user && supabase && synced) {
        supabase
          .from("plans")
          .upsert({ user_id: user.id, data: plan, updated_at: new Date().toISOString() })
          .then(() => {});
      }
    }, 800);
    return () => clearTimeout(timer.current);
  }, [plan, ready, user, synced]);

  const update = useCallback((f: (p: Plan) => Plan) => setPlan(f), []);
  return <Ctx.Provider value={{ plan, update, cloud: !!user && synced }}>{children}</Ctx.Provider>;
}
