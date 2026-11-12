"use client";
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";
import { ExchangeProvider } from "@/lib/exchange-context";
import { LocationProvider } from "@/lib/location";
import { PlanProvider } from "@/lib/plan";
import { WeatherProvider } from "@/lib/weather-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PlanProvider>
        <WeatherProvider>
          <ExchangeProvider>
            <LocationProvider>{children}</LocationProvider>
          </ExchangeProvider>
        </WeatherProvider>
      </PlanProvider>
    </AuthProvider>
  );
}
