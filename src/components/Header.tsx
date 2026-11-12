"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useWeather } from "@/lib/weather-context";

const NAV: [string, string][] = [
  ["/", "Dashboard"],
  ["/explore", "Explore"],
  ["/weather", "Weather"],
  ["/near", "Near me"],
  ["/routes", "Routes"],
  ["/transport", "Transport"],
  ["/trip", "Itinerary"],
  ["/packing", "Packing"],
  ["/budget", "Budget"],
  ["/alerts", "Alerts"],
];

function SriLankaClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    function tick() {
      setNow(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Colombo", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  return <span className="live"><i />🇱🇰 {now}</span>;
}

export default function Header() {
  const path = usePathname();
  const { updated, error } = useWeather();
  const { user } = useAuth();
  const live = !!updated && !error;
  
  return (
    <header className="glass sticky top-0 z-[100] mb-5 flex flex-wrap items-center gap-2 !rounded-full !py-2 !px-4 max-md:!rounded-3xl backdrop-blur-xl">
      <Link href="/" aria-label="JourneyReady home" className="shrink-0">
        <img
          src="/logo.png"
          alt="JourneyReady"
          className="block h-[44px] w-auto rounded-full px-3 py-1"
          style={{ background: "#f4f5ef" }}
        />
      </Link>
      
      <nav className="flex min-w-0 flex-1 gap-1 overflow-x-auto scrollbar-hide" aria-label="Main">
        {NAV.map(([href, label]) => {
          const on = path === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={on ? "page" : undefined}
              className="whitespace-nowrap rounded-full px-3.5 py-2 text-[14px] font-semibold transition-all duration-300 hover:bg-white/20"
              style={
                on
                  ? {
                      background: "rgba(245, 130, 32, 0.85)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(245, 130, 32, 0.3)",
                    }
                  : { opacity: 0.75 }
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>
      
      <div className="flex flex-wrap items-center gap-2">
        <SriLankaClock />
        <span className={`live text-[11px] ${live ? "" : "off"} max-xl:hidden`}>
          <i />
          {live
            ? `Updated ${updated!.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
              : "Not loaded"}
        </span>
        <Link href="/login" className="btn !py-1.5 !px-3 text-sm">
          {user ? "Account" : "Log in"}
        </Link>
      </div>
    </header>
  );
}
