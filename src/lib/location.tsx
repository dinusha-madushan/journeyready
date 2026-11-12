"use client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

export interface Pos { lat: number; lon: number; acc: number; speed: number | null; heading: number | null; time: number }
export type LocStatus = "idle" | "asking" | "on" | "denied" | "unavailable" | "unsupported";

interface Ctx { pos: Pos | null; status: LocStatus; start: () => void; stop: () => void }
const C = createContext<Ctx>({ pos: null, status: "idle", start: () => {}, stop: () => {} });
export const useLocation = () => useContext(C);

/** Real-time position from the browser (GPS, Wi-Fi or phone network). It stays in the browser. */
export function LocationProvider({ children }: { children: ReactNode }) {
  const [pos, setPos] = useState<Pos | null>(null);
  const [status, setStatus] = useState<LocStatus>("idle");
  const watch = useRef<number | null>(null);

  const clear = () => {
    if (watch.current != null && typeof navigator !== "undefined" && navigator.geolocation) navigator.geolocation.clearWatch(watch.current);
    watch.current = null;
  };

  const stop = useCallback(() => {
    clear();
    setPos(null);
    setStatus("idle");
    try { localStorage.removeItem("jr-loc"); } catch {}
  }, []);

  const start = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) return setStatus("unsupported");
    if (watch.current != null) return;
    setStatus("asking");
    watch.current = navigator.geolocation.watchPosition(
      (p) => {
        setPos({ lat: p.coords.latitude, lon: p.coords.longitude, acc: Math.round(p.coords.accuracy), speed: p.coords.speed, heading: p.coords.heading, time: p.timestamp });
        setStatus("on");
        try { localStorage.setItem("jr-loc", "1"); } catch {}
      },
      (e) => {
        if (e.code === 1) { clear(); setStatus("denied"); } // permission denied
        else setStatus("unavailable"); // keep watching. It can recover.
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );
  }, []);

  // If the person turned it on before, continue after a reload.
  useEffect(() => {
    try { if (localStorage.getItem("jr-loc") === "1") start(); } catch {}
    return clear;
  }, [start]);

  return <C.Provider value={{ pos, status, start, stop }}>{children}</C.Provider>;
}
