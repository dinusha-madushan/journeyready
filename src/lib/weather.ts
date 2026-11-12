export interface Day {
  date: string; hi: number; lo: number; rain: number; code: number;
  mm: number; windMax: number; uv: number; sunrise: string; sunset: string;
}
export interface Hour { time: string; temp: number; rain: number; code: number }
export interface Wx {
  id: string;
  temp: number;
  feels: number;
  code: number;
  humidity: number;
  wind: number;
  rain: number;
  days: Day[];
  hours: Hour[];
  time: string;
}

/** WMO weather codes used by Open-Meteo. */
export function describe(c: number): { text: string; icon: string } {
  if (c === 0) return { text: "Clear sky", icon: "☀️" };
  if (c <= 2) return { text: "Partly cloudy", icon: "⛅" };
  if (c === 3) return { text: "Cloudy", icon: "☁️" };
  if (c <= 48) return { text: "Fog", icon: "🌫️" };
  if (c <= 57) return { text: "Drizzle", icon: "🌦️" };
  if (c <= 67) return { text: "Rain", icon: "🌧️" };
  if (c <= 77) return { text: "Snow", icon: "🌨️" };
  if (c <= 82) return { text: "Rain showers", icon: "🌦️" };
  if (c <= 86) return { text: "Snow showers", icon: "🌨️" };
  return { text: "Thunderstorm", icon: "⛈️" };
}
