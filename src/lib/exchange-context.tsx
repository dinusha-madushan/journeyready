"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface Rates { USD: number; EUR: number; GBP: number; AUD: number; time: Date | null }
interface ExCtx { rates: Rates; loading: boolean; error: boolean }

// Fallback rates (approximate as of 2024)
const FALLBACK_RATES: Rates = { 
  USD: 300, 
  EUR: 330, 
  GBP: 390, 
  AUD: 200, 
  time: null 
};

const EMPTY: Rates = { USD: 0, EUR: 0, GBP: 0, AUD: 0, time: null };
const Ctx = createContext<ExCtx>({ rates: FALLBACK_RATES, loading: false, error: false });
export const useExchange = () => useContext(Ctx);

const EVERY = 30 * 60 * 1000; // refresh every 30 minutes

/**
 * Live exchange rates from the free Frankfurter API (backed by ECB data).
 * Converts major currencies to LKR. No API key needed.
 * Falls back to approximate rates if API is unavailable.
 */
export function ExchangeProvider({ children }: { children: ReactNode }) {
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // Frankfurter API: get LKR rate for major currencies
        const r = await fetch("https://api.frankfurter.app/latest?from=LKR&to=USD,EUR,GBP,AUD", {
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        if (!r.ok) throw new Error("API request failed");
        const j = await r.json();
        
        // Validate response
        if (!j.rates || typeof j.rates !== 'object') {
          throw new Error("Invalid API response");
        }
        
        // j.rates gives how much 1 LKR is in USD etc.
        // We want: how many LKR per 1 USD, 1 EUR, etc.
        const newRates = {
          USD: j.rates.USD ? Math.round(1 / j.rates.USD) : FALLBACK_RATES.USD,
          EUR: j.rates.EUR ? Math.round(1 / j.rates.EUR) : FALLBACK_RATES.EUR,
          GBP: j.rates.GBP ? Math.round(1 / j.rates.GBP) : FALLBACK_RATES.GBP,
          AUD: j.rates.AUD ? Math.round(1 / j.rates.AUD) : FALLBACK_RATES.AUD,
          time: new Date(),
        };
        
        // Sanity check: rates should be reasonable (between 50 and 1000)
        if (newRates.USD >= 50 && newRates.USD <= 1000) {
          setRates(newRates);
          setError(false);
        } else {
          throw new Error("Unreasonable rates returned");
        }
      } catch (err) {
        console.warn("Exchange rate API failed, using fallback rates:", err);
        setError(true);
        // Keep using fallback rates on error
        setRates(FALLBACK_RATES);
      } finally {
        setLoading(false);
      }
    }
    
    load();
    const t = setInterval(load, EVERY);
    return () => clearInterval(t);
  }, []);

  return <Ctx.Provider value={{ rates, loading, error }}>{children}</Ctx.Provider>;
}
