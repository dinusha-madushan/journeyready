"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import type { Wx } from "./weather";

interface WxCtx { wx: Record<string, Wx>; updated: Date | null; error: boolean }
const Ctx = createContext<WxCtx>({ wx: {}, updated: null, error: false });
export const useWeather = () => useContext(Ctx);

const EVERY = 10 * 60 * 1000; // refresh every 10 minutes

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [wx, setWx] = useState<Record<string, Wx>>({});
  const [updated, setUpdated] = useState<Date | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let last = 0;
    async function load() {
      try {
        const r = await fetch("/api/weather", { cache: "no-store" });
        if (!r.ok) throw new Error("bad");
        const j: Wx[] = await r.json();
        setWx(Object.fromEntries(j.map((w) => [w.id, w])));
        setUpdated(new Date());
        setError(false);
        last = Date.now();
      } catch {
        setError(true);
      }
    }
    load();
    const t = setInterval(load, EVERY);
    const vis = () => {
      if (!document.hidden && Date.now() - last > EVERY / 2) load();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return <Ctx.Provider value={{ wx, updated, error }}>{children}</Ctx.Provider>;
}
