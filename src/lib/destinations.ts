export type Kind = "Beach" | "Hills" | "History" | "Wildlife";

export interface Dest {
  id: string;
  name: string;
  lat: number;
  lon: number;
  kind: Kind;
  icon: string;
  blurb: string;
  image?: string; // Real image path
}

export const DESTS: Dest[] = [
  { 
    id: "sigiriya", 
    name: "Sigiriya", 
    lat: 7.957, 
    lon: 80.76, 
    kind: "History", 
    icon: "🏯", 
    blurb: "Lion Rock fortress rising out of the jungle.",
    image: "/places/sigiriya.jpg"
  },
  { 
    id: "ella", 
    name: "Ella", 
    lat: 6.867, 
    lon: 81.046, 
    kind: "Hills", 
    icon: "🚆", 
    blurb: "Tea hills, the Nine Arches Bridge and slow blue trains.",
    image: "/places/ella.jpg"
  },
  { 
    id: "kandy", 
    name: "Kandy", 
    lat: 7.291, 
    lon: 80.634, 
    kind: "History", 
    icon: "🛕", 
    blurb: "Lake town and home of the Temple of the Tooth.",
    image: "/places/kandy.jpg"
  },
  { 
    id: "galle", 
    name: "Galle", 
    lat: 6.033, 
    lon: 80.217, 
    kind: "Beach", 
    icon: "🏰", 
    blurb: "Dutch fort walls above the Indian Ocean.",
    image: "/places/galle.jpg"
  },
  { 
    id: "mirissa", 
    name: "Mirissa", 
    lat: 5.948, 
    lon: 80.459, 
    kind: "Beach", 
    icon: "🐋", 
    blurb: "Palm beaches and whale watching.",
    image: "/places/mirissa.jpg"
  },
  { 
    id: "nuwara-eliya", 
    name: "Nuwara Eliya", 
    lat: 6.95, 
    lon: 80.789, 
    kind: "Hills", 
    icon: "🍃", 
    blurb: "Little England, tea estates and cool air.",
    image: "/places/nuwara-eliya.jpg"
  },
  { 
    id: "colombo", 
    name: "Colombo", 
    lat: 6.927, 
    lon: 79.861, 
    kind: "History", 
    icon: "🌆", 
    blurb: "The busy capital with food, markets and the sea front.",
    image: "/places/colombo.jpg"
  },
  { 
    id: "trincomalee", 
    name: "Trincomalee", 
    lat: 8.587, 
    lon: 81.215, 
    kind: "Beach", 
    icon: "🏝️", 
    blurb: "Calm bays, clear water and snorkelling.",
    image: "/places/trincomalee.jpg"
  },
  { 
    id: "yala", 
    name: "Yala", 
    lat: 6.372, 
    lon: 81.5, 
    kind: "Wildlife", 
    icon: "🐆", 
    blurb: "Safari park with leopards and elephants.",
    image: "/places/yala.jpg"
  },
  { 
    id: "anuradhapura", 
    name: "Anuradhapura", 
    lat: 8.311, 
    lon: 80.404, 
    kind: "History", 
    icon: "🕌", 
    blurb: "Ancient capital with giant white stupas.",
    image: "/places/anuradhapura.jpg"
  },
  { 
    id: "arugam-bay", 
    name: "Arugam Bay", 
    lat: 6.84, 
    lon: 81.835, 
    kind: "Beach", 
    icon: "🏄", 
    blurb: "Surf town on the east coast.",
    image: "/places/arugam-bay.jpg"
  },
  { 
    id: "jaffna", 
    name: "Jaffna", 
    lat: 9.661, 
    lon: 80.025, 
    kind: "History", 
    icon: "🪔", 
    blurb: "Northern city with Tamil temples, forts and food.",
    image: "/places/jaffna.jpg"
  },
];

export const byId = (id: string) => DESTS.find((d) => d.id === id);

export const KIND_BG: Record<Kind, string> = {
  Beach: "linear-gradient(160deg,#0f8a82,#164e63 65%,#0b2a24)",
  Hills: "linear-gradient(160deg,#3a8a5c,#1d4a3a 65%,#0b2a24)",
  History: "linear-gradient(160deg,#b27a33,#4a3a22 65%,#0b2a24)",
  Wildlife: "linear-gradient(160deg,#7f8f2f,#2f4a22 65%,#0b2a24)",
};

export const KIND_LABEL: Record<Kind, string> = {
  Beach: "Beach and swimming",
  Hills: "Hiking and hills",
  History: "Temples and history",
  Wildlife: "Safari",
};
