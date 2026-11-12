"use client";
import { weatherAlerts } from "@/lib/alerts";
import { useWeather } from "@/lib/weather-context";
import { Card } from "@/components/ui";

const LINKS: [string, string, string][] = [
  ["Sri Lanka Tourism", "https://www.srilanka.travel", "Official visitor information"],
  ["Department of Meteorology", "https://meteo.gov.lk", "Official weather warnings"],
  ["Disaster Management Centre", "https://www.dmc.gov.lk", "Floods, landslides and safety notices"],
  ["Sri Lanka ETA", "https://eta.gov.lk", "Electronic travel authorisation for visitors"],
];

export default function Alerts() {
  const { wx, error } = useWeather();
  const alerts = weatherAlerts(wx);
  
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card>
        <h1>Travel alerts</h1>
        <p className="mb-4">Made from the live forecast for the next 3 days.</p>
        {error && <p>Live weather is not available now.</p>}
        {!error && Object.keys(wx).length === 0 && <p>Loading...</p>}
        {!error && Object.keys(wx).length > 0 && alerts.length === 0 && (
          <p>No weather alerts for any place. Safe travels!</p>
        )}
        {alerts.map((a) => (
          <div key={a.id} className="line">
            <span>
              {a.level === "warn" ? "⚠️" : "ℹ️"} <b>{a.place}</b>
              <br />
              <small style={{ color: "var(--mu)" }}>{a.text}</small>
            </span>
          </div>
        ))}
      </Card>
      
      <Card>
        <h2>Official updates</h2>
        <p className="mb-4">Always check these for the latest notices.</p>
        {LINKS.map(([name, url, note]) => (
          <div key={url} className="line">
            <span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:opacity-80"
              >
                {name}
              </a>
              <br />
              <small style={{ color: "var(--mu)" }}>{note}</small>
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}
