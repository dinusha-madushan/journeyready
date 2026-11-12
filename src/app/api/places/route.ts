import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CATS: Record<string, string> = {
  restaurant: "catering.restaurant",
  hotel: "accommodation.hotel",
  hospital: "healthcare.hospital",
  pharmacy: "healthcare.pharmacy",
  fuel: "service.vehicle.fuel",
};

// Sample fallback data for major cities when API key is not available
const FALLBACK_PLACES: Record<string, Array<{name: string; address: string; lat: number; lon: number}>> = {
  "catering.restaurant": [
    { name: "Ministry of Crab", address: "Old Dutch Hospital, Colombo 01", lat: 6.9343, lon: 79.8474 },
    { name: "Nuga Gama", address: "Cinnamon Grand, Colombo 03", lat: 6.9147, lon: 79.8501 },
    { name: "The Lagoon", address: "Cinnamon Grand, Colombo 03", lat: 6.9147, lon: 79.8501 },
    { name: "Upali's by Nawaloka", address: "Colombo 07", lat: 6.9147, lon: 79.8612 },
    { name: "Galle Face Hotel", address: "Galle Face, Colombo 03", lat: 6.9271, lon: 79.8456 },
  ],
  "accommodation.hotel": [
    { name: "Galle Face Hotel", address: "2 Galle Face, Colombo 03", lat: 6.9271, lon: 79.8456 },
    { name: "Cinnamon Grand", address: "77 Galle Road, Colombo 03", lat: 6.9147, lon: 79.8501 },
    { name: "Taj Samudra", address: "25 Galle Face Centre Road, Colombo 03", lat: 6.9237, lon: 79.8468 },
    { name: "Shangri-La Hotel", address: "1 Galle Face, Colombo 02", lat: 6.9319, lon: 79.8434 },
    { name: "Hilton Colombo", address: "2 Sir Chittampalam A Gardiner Mawatha, Colombo 02", lat: 6.9297, lon: 79.8478 },
  ],
  "healthcare.hospital": [
    { name: "Asiri Central Hospital", address: "114 Norris Canal Road, Colombo 10", lat: 6.9108, lon: 79.8789 },
    { name: "Nawaloka Hospital", address: "23 Deshamanya H K Dharmadasa Mawatha, Colombo 02", lat: 6.9147, lon: 79.8612 },
    { name: "Lanka Hospitals", address: "578 Elvitigala Mawatha, Colombo 05", lat: 6.8867, lon: 79.8781 },
    { name: "Durdans Hospital", address: "3 Alfred Place, Colombo 03", lat: 6.9133, lon: 79.8533 },
    { name: "National Hospital of Sri Lanka", address: "Regent Street, Colombo 07", lat: 6.9197, lon: 79.8653 },
  ],
  "healthcare.pharmacy": [
    { name: "Osu Sala Pharmacy", address: "Liberty Plaza, Colombo 03", lat: 6.9086, lon: 79.8533 },
    { name: "Laughs Pharmacy", address: "Multiple locations, Colombo", lat: 6.9271, lon: 79.8612 },
    { name: "Jeya Pharmacy", address: "Bambalapitiya, Colombo 04", lat: 6.8950, lon: 79.8550 },
    { name: "State Pharmaceuticals", address: "Various locations", lat: 6.9271, lon: 79.8612 },
  ],
  "service.vehicle.fuel": [
    { name: "Ceypetco Fuel Station", address: "Galle Road, Colombo 03", lat: 6.9147, lon: 79.8501 },
    { name: "IOC Fuel Station", address: "Duplication Road, Colombo 04", lat: 6.8950, lon: 79.8600 },
    { name: "Ceypetco - Union Place", address: "Union Place, Colombo 02", lat: 6.9211, lon: 79.8578 },
    { name: "Laughs Fuel Station", address: "Bambalapitiya, Colombo 04", lat: 6.8950, lon: 79.8550 },
  ],
};

// Calculate distance between two points in meters
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

/** Nearby places from Geoapify. The key stays on the server. */
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const lat = Number(p.get("lat"));
  const lon = Number(p.get("lon"));
  const cat = CATS[p.get("cat") || ""];
  if (!isFinite(lat) || !isFinite(lon) || !cat) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const key = process.env.GEOAPIFY_API_KEY;
  
  // If no API key, return fallback data with distance calculation
  if (!key) {
    const fallbackData = FALLBACK_PLACES[cat] || [];
    const placesWithDistance = fallbackData
      .map((place, index) => ({
        id: `fallback-${cat}-${index}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lon: place.lon,
        distance: calculateDistance(lat, lon, place.lat, place.lon),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 8);
    
    return NextResponse.json(placesWithDistance);
  }

  try {
    const url =
      `https://api.geoapify.com/v2/places?categories=${cat}` +
      `&filter=circle:${lon},${lat},8000&bias=proximity:${lon},${lat}&limit=12&apiKey=${key}`;
    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (!r.ok) return NextResponse.json({ error: "service" }, { status: 502 });
    const j = await r.json();
    const out = (j.features || []).map((f: any) => ({
      id: f.properties.place_id,
      name: f.properties.name || "Unnamed place",
      address: f.properties.address_line2 || f.properties.formatted || "",
      lat: f.properties.lat,
      lon: f.properties.lon,
      distance: f.properties.distance ?? null,
    }));
    return NextResponse.json(out);
  } catch {
    return NextResponse.json({ error: "service" }, { status: 502 });
  }
}
