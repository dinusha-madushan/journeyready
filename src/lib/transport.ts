// Sri Lanka Public Transport Data
// Bus & Train schedules, routes, fares

export type TransportType = "train" | "bus" | "intercity";
export type RouteClass = "1st" | "2nd" | "3rd" | "ac" | "normal" | "semi-luxury" | "luxury";

export interface TransportRoute {
  id: string;
  type: TransportType;
  from: string;
  to: string;
  fromCode?: string;
  toCode?: string;
  departure: string; // HH:MM format
  arrival: string;
  duration: string; // e.g., "2h 30m"
  class: RouteClass;
  fare: number; // in LKR
  frequency?: string; // e.g., "Daily", "Weekdays only"
  operator?: string;
  distance?: number; // in km
  stops?: string[];
  notes?: string;
}

export interface Station {
  code: string;
  name: string;
  district: string;
  type: "railway" | "bus-stand" | "both";
  lat: number;
  lon: number;
}

// Major Railway Stations
export const RAILWAY_STATIONS: Station[] = [
  { code: "CMB", name: "Colombo Fort", district: "Colombo", type: "railway", lat: 6.9344, lon: 79.8428 },
  { code: "MDA", name: "Maradana", district: "Colombo", type: "railway", lat: 6.9297, lon: 79.8611 },
  { code: "RAG", name: "Ragama", district: "Gampaha", type: "railway", lat: 7.0275, lon: 79.9214 },
  { code: "GLA", name: "Gampaha", district: "Gampaha", type: "railway", lat: 7.0917, lon: 80.0000 },
  { code: "VYA", name: "Veyangoda", district: "Gampaha", type: "railway", lat: 7.1572, lon: 80.0808 },
  { code: "PTA", name: "Polgahawela", district: "Kurunegala", type: "railway", lat: 7.3333, lon: 80.3000 },
  { code: "KRN", name: "Kurunegala", district: "Kurunegala", type: "railway", lat: 7.4867, lon: 80.3636 },
  { code: "KDT", name: "Kandy", district: "Kandy", type: "railway", lat: 7.2936, lon: 80.6350 },
  { code: "GMP", name: "Gampola", district: "Kandy", type: "railway", lat: 7.1642, lon: 80.5736 },
  { code: "NWE", name: "Nanu Oya (Nuwara Eliya)", district: "Nuwara Eliya", type: "railway", lat: 6.9497, lon: 80.7603 },
  { code: "HPN", name: "Haputale", district: "Badulla", type: "railway", lat: 6.7667, lon: 80.9500 },
  { code: "ELA", name: "Ella", district: "Badulla", type: "railway", lat: 6.8667, lon: 81.0467 },
  { code: "DDA", name: "Demodara", district: "Badulla", type: "railway", lat: 6.8833, lon: 81.0667 },
  { code: "BDA", name: "Badulla", district: "Badulla", type: "railway", lat: 6.9934, lon: 81.0550 },
  { code: "GAL", name: "Galle", district: "Galle", type: "railway", lat: 6.0270, lon: 80.2170 },
  { code: "MTR", name: "Matara", district: "Matara", type: "railway", lat: 5.9467, lon: 80.5550 },
  { code: "BLA", name: "Beliatta", district: "Hambantota", type: "railway", lat: 6.0500, lon: 80.7500 },
  { code: "ANP", name: "Anuradhapura", district: "Anuradhapura", type: "railway", lat: 8.3114, lon: 80.4037 },
  { code: "VNA", name: "Vavuniya", district: "Vavuniya", type: "railway", lat: 8.7514, lon: 80.4971 },
  { code: "TCO", name: "Trincomalee", district: "Trincomalee", type: "railway", lat: 8.5711, lon: 81.2335 },
  { code: "BTL", name: "Batticaloa", district: "Batticaloa", type: "railway", lat: 7.7306, lon: 81.6978 },
];

// Popular Train Routes (Main Line, Coast Line, Upcountry)
export const TRAIN_ROUTES: TransportRoute[] = [
  // Main Line - Colombo to Kandy
  {
    id: "train-001",
    type: "train",
    from: "Colombo Fort",
    to: "Kandy",
    fromCode: "CMB",
    toCode: "KDT",
    departure: "05:55",
    arrival: "08:47",
    duration: "2h 52m",
    class: "2nd",
    fare: 180,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 121,
    notes: "Intercity Express - Scenic route"
  },
  {
    id: "train-002",
    type: "train",
    from: "Colombo Fort",
    to: "Kandy",
    fromCode: "CMB",
    toCode: "KDT",
    departure: "15:30",
    arrival: "19:30",
    duration: "4h",
    class: "3rd",
    fare: 90,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 121,
    notes: "Slow train - stops at all stations"
  },
  
  // Upcountry Line - Colombo to Badulla
  {
    id: "train-010",
    type: "train",
    from: "Colombo Fort",
    to: "Badulla",
    fromCode: "CMB",
    toCode: "BDA",
    departure: "08:30",
    arrival: "18:48",
    duration: "10h 18m",
    class: "2nd",
    fare: 450,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 290,
    notes: "Most scenic train journey in the world! Via Kandy, Nanu Oya, Ella"
  },
  {
    id: "train-011",
    type: "train",
    from: "Kandy",
    to: "Ella",
    fromCode: "KDT",
    toCode: "ELA",
    departure: "11:10",
    arrival: "17:34",
    duration: "6h 24m",
    class: "2nd",
    fare: 280,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 169,
    notes: "Famous hill country route - book in advance!"
  },
  {
    id: "train-012",
    type: "train",
    from: "Kandy",
    to: "Badulla",
    fromCode: "KDT",
    toCode: "BDA",
    departure: "08:47",
    arrival: "16:10",
    duration: "7h 23m",
    class: "3rd",
    fare: 180,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 169,
    notes: "Budget option - gets crowded"
  },
  
  // Coast Line - Colombo to Galle/Matara
  {
    id: "train-020",
    type: "train",
    from: "Colombo Fort",
    to: "Galle",
    fromCode: "CMB",
    toCode: "GAL",
    departure: "06:00",
    arrival: "08:30",
    duration: "2h 30m",
    class: "2nd",
    fare: 180,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 116,
    notes: "Coastal route - beautiful ocean views"
  },
  {
    id: "train-021",
    type: "train",
    from: "Colombo Fort",
    to: "Matara",
    fromCode: "CMB",
    toCode: "MTR",
    departure: "06:35",
    arrival: "10:05",
    duration: "3h 30m",
    class: "2nd",
    fare: 220,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 162,
    notes: "Express coastal train"
  },
  {
    id: "train-022",
    type: "train",
    from: "Galle",
    to: "Matara",
    fromCode: "GAL",
    toCode: "MTR",
    departure: "14:30",
    arrival: "15:45",
    duration: "1h 15m",
    class: "3rd",
    fare: 60,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 46
  },
  
  // Northern Line
  {
    id: "train-030",
    type: "train",
    from: "Colombo Fort",
    to: "Vavuniya",
    fromCode: "CMB",
    toCode: "VNA",
    departure: "05:45",
    arrival: "13:35",
    duration: "7h 50m",
    class: "2nd",
    fare: 390,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 259,
    notes: "Via Anuradhapura"
  },
  
  // Eastern Line
  {
    id: "train-040",
    type: "train",
    from: "Colombo Fort",
    to: "Trincomalee",
    fromCode: "CMB",
    toCode: "TCO",
    departure: "06:00",
    arrival: "16:15",
    duration: "10h 15m",
    class: "2nd",
    fare: 420,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 265
  },
  {
    id: "train-041",
    type: "train",
    from: "Colombo Fort",
    to: "Batticaloa",
    fromCode: "CMB",
    toCode: "BTL",
    departure: "06:00",
    arrival: "15:30",
    duration: "9h 30m",
    class: "2nd",
    fare: 400,
    frequency: "Daily",
    operator: "Sri Lanka Railways",
    distance: 310
  },
];

// Popular Bus Routes (Long Distance)
export const BUS_ROUTES: TransportRoute[] = [
  // Colombo to Kandy
  {
    id: "bus-001",
    type: "bus",
    from: "Colombo (Bastian Mawatha)",
    to: "Kandy",
    departure: "06:00",
    arrival: "09:00",
    duration: "3h",
    class: "ac",
    fare: 450,
    frequency: "Every 30 mins",
    operator: "SLTB / Private",
    distance: 115,
    notes: "AC luxury bus - faster route via Kadawatha"
  },
  {
    id: "bus-002",
    type: "bus",
    from: "Colombo (Bastian Mawatha)",
    to: "Kandy",
    departure: "Frequent",
    arrival: "-",
    duration: "3h 30m",
    class: "normal",
    fare: 250,
    frequency: "Every 15 mins",
    operator: "SLTB",
    distance: 115,
    notes: "Regular bus - cheaper option"
  },
  
  // Colombo to Galle
  {
    id: "bus-010",
    type: "bus",
    from: "Colombo (Maharagama)",
    to: "Galle",
    departure: "Frequent",
    arrival: "-",
    duration: "2h 30m",
    class: "ac",
    fare: 400,
    frequency: "Every 20 mins",
    operator: "Private Operators",
    distance: 116,
    notes: "Express highway route - very fast"
  },
  {
    id: "bus-011",
    type: "bus",
    from: "Colombo (Maharagama)",
    to: "Galle",
    departure: "Frequent",
    arrival: "-",
    duration: "3h 30m",
    class: "normal",
    fare: 180,
    frequency: "Every 10 mins",
    operator: "SLTB",
    distance: 116,
    notes: "Coast road - scenic but slower"
  },
  
  // Colombo to Jaffna
  {
    id: "bus-020",
    type: "bus",
    from: "Colombo (Bastian Mawatha)",
    to: "Jaffna",
    departure: "08:00",
    arrival: "17:00",
    duration: "9h",
    class: "luxury",
    fare: 1500,
    frequency: "Daily",
    operator: "Private Luxury",
    distance: 395,
    notes: "AC luxury coach - reclining seats"
  },
  {
    id: "bus-021",
    type: "bus",
    from: "Colombo (Bastian Mawatha)",
    to: "Jaffna",
    departure: "20:00",
    arrival: "05:00",
    duration: "9h",
    class: "semi-luxury",
    fare: 1000,
    frequency: "Daily",
    operator: "SLTB",
    distance: 395,
    notes: "Overnight bus"
  },
  
  // Colombo to Trincomalee
  {
    id: "bus-030",
    type: "bus",
    from: "Colombo (Bastian Mawatha)",
    to: "Trincomalee",
    departure: "07:00",
    arrival: "15:00",
    duration: "8h",
    class: "ac",
    fare: 1200,
    frequency: "Daily",
    operator: "Private AC",
    distance: 257,
    notes: "Via Habarana"
  },
  
  // Colombo to Ella
  {
    id: "bus-040",
    type: "bus",
    from: "Colombo (Maharagama)",
    to: "Ella",
    departure: "06:00",
    arrival: "14:30",
    duration: "8h 30m",
    class: "semi-luxury",
    fare: 800,
    frequency: "Daily",
    operator: "Private",
    distance: 230,
    notes: "Via Nuwara Eliya - scenic route"
  },
  
  // Kandy to Nuwara Eliya
  {
    id: "bus-050",
    type: "bus",
    from: "Kandy",
    to: "Nuwara Eliya",
    departure: "Frequent",
    arrival: "-",
    duration: "2h 30m",
    class: "normal",
    fare: 180,
    frequency: "Every 30 mins",
    operator: "SLTB",
    distance: 77,
    notes: "Hill country route"
  },
  
  // Galle to Mirissa
  {
    id: "bus-060",
    type: "bus",
    from: "Galle",
    to: "Mirissa",
    departure: "Frequent",
    arrival: "-",
    duration: "45m",
    class: "normal",
    fare: 80,
    frequency: "Every 15 mins",
    operator: "SLTB",
    distance: 25,
    notes: "Coastal route - frequent service"
  },
  
  // Colombo to Anuradhapura
  {
    id: "bus-070",
    type: "bus",
    from: "Colombo (Bastian Mawatha)",
    to: "Anuradhapura",
    departure: "Frequent",
    arrival: "-",
    duration: "4h 30m",
    class: "ac",
    fare: 650,
    frequency: "Every hour",
    operator: "Private AC",
    distance: 206,
    notes: "Via Kurunegala"
  },
];

// Helper functions
export function getRoutesByOrigin(origin: string, type?: TransportType) {
  const routes = type === "train" ? TRAIN_ROUTES : type === "bus" ? BUS_ROUTES : [...TRAIN_ROUTES, ...BUS_ROUTES];
  return routes.filter(r => r.from.toLowerCase().includes(origin.toLowerCase()));
}

export function getRoutesByDestination(destination: string, type?: TransportType) {
  const routes = type === "train" ? TRAIN_ROUTES : type === "bus" ? BUS_ROUTES : [...TRAIN_ROUTES, ...BUS_ROUTES];
  return routes.filter(r => r.to.toLowerCase().includes(destination.toLowerCase()));
}

export function searchRoutes(from: string, to: string, type?: TransportType) {
  const routes = type === "train" ? TRAIN_ROUTES : type === "bus" ? BUS_ROUTES : [...TRAIN_ROUTES, ...BUS_ROUTES];
  return routes.filter(r => 
    r.from.toLowerCase().includes(from.toLowerCase()) && 
    r.to.toLowerCase().includes(to.toLowerCase())
  );
}

export function getStationByCode(code: string) {
  return RAILWAY_STATIONS.find(s => s.code === code);
}

export function getStationsByDistrict(district: string) {
  return RAILWAY_STATIONS.filter(s => s.district === district);
}

export const TRANSPORT_TYPES = [
  { id: "all", label: "All Transport", icon: "🚆" },
  { id: "train", label: "Trains", icon: "🚂" },
  { id: "bus", label: "Buses", icon: "🚌" },
] as const;

export const CLASS_INFO = {
  "1st": { label: "1st Class", color: "#2fbf6b", desc: "Reserved seats, AC" },
  "2nd": { label: "2nd Class", color: "#f58220", desc: "Reserved seats" },
  "3rd": { label: "3rd Class", color: "#12406e", desc: "Non-reserved" },
  "ac": { label: "AC Bus", color: "#2fbf6b", desc: "Air conditioned" },
  "luxury": { label: "Luxury", color: "#9b59b6", desc: "Reclining seats, AC" },
  "semi-luxury": { label: "Semi-Luxury", color: "#f58220", desc: "Comfortable seats" },
  "normal": { label: "Normal", color: "#12406e", desc: "Standard bus" },
};
