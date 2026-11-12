// Sri Lanka Administrative Structure with Real Travel Data

export type Province = 
  | "Western"
  | "Central" 
  | "Southern"
  | "Northern"
  | "Eastern"
  | "North Western"
  | "North Central"
  | "Uva"
  | "Sabaragamuwa";

export interface District {
  id: string;
  name: string;
  province: Province;
  description: string;
  icon: string;
  image?: string;
}

export interface Place {
  id: string;
  name: string;
  districtId: string;
  lat: number;
  lon: number;
  category: "Beach" | "Hills" | "History" | "Wildlife" | "City" | "Cultural";
  icon: string;
  description: string;
  images?: string[];
  videos?: string[];
  bestTime: string;
  duration: string; // How long to spend
  entryFee?: string;
  highlights: string[];
}

// 25 Districts of Sri Lanka
export const DISTRICTS: District[] = [
  // Western Province (3 districts)
  {
    id: "colombo",
    name: "Colombo",
    province: "Western",
    description: "Commercial capital with beaches, shopping, and nightlife",
    icon: "🏙️",
    image: "/districts/colombo.jpg"
  },
  {
    id: "gampaha",
    name: "Gampaha",
    province: "Western",
    description: "Gateway to the island with beaches and Buddhist sites",
    icon: "🏖️",
    image: "/districts/gampaha.jpg"
  },
  {
    id: "kalutara",
    name: "Kalutara",
    province: "Western",
    description: "Palm-fringed beaches and water sports paradise",
    icon: "🏄",
    image: "/districts/kalutara.jpg"
  },

  // Central Province (3 districts)
  {
    id: "kandy",
    name: "Kandy",
    province: "Central",
    description: "Last kingdom of Sri Lanka, Temple of the Tooth, cultural heart",
    icon: "🛕",
    image: "/districts/kandy.jpg"
  },
  {
    id: "matale",
    name: "Matale",
    province: "Central",
    description: "Spice gardens, cave temples, and lush green landscapes",
    icon: "🌿",
    image: "/districts/matale.jpg"
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    province: "Central",
    description: "Little England - tea estates, cool climate, colonial charm",
    icon: "🍃",
    image: "/districts/nuwara-eliya.jpg"
  },

  // Southern Province (3 districts)
  {
    id: "galle",
    name: "Galle",
    province: "Southern",
    description: "Dutch fort, historic city, beautiful beaches",
    icon: "🏰",
    image: "/districts/galle.jpg"
  },
  {
    id: "matara",
    name: "Matara",
    province: "Southern",
    description: "Southern coastal town with temples and beaches",
    icon: "🌊",
    image: "/districts/matara.jpg"
  },
  {
    id: "hambantota",
    name: "Hambantota",
    province: "Southern",
    description: "Safari parks, salt pans, and wildlife sanctuaries",
    icon: "🐆",
    image: "/districts/hambantota.jpg"
  },

  // Northern Province (5 districts)
  {
    id: "jaffna",
    name: "Jaffna",
    province: "Northern",
    description: "Tamil culture, Hindu temples, islands, unique cuisine",
    icon: "🪔",
    image: "/districts/jaffna.jpg"
  },
  {
    id: "kilinochchi",
    name: "Kilinochchi",
    province: "Northern",
    description: "Historic significance and cultural heritage",
    icon: "🏛️",
    image: "/districts/kilinochchi.jpg"
  },
  {
    id: "mannar",
    name: "Mannar",
    province: "Northern",
    description: "Adam's Bridge, baobab trees, and coastal beauty",
    icon: "🌳",
    image: "/districts/mannar.jpg"
  },
  {
    id: "vavuniya",
    name: "Vavuniya",
    province: "Northern",
    description: "Gateway to the north with archaeological sites",
    icon: "🗿",
    image: "/districts/vavuniya.jpg"
  },
  {
    id: "mullaitivu",
    name: "Mullaitivu",
    province: "Northern",
    description: "Pristine beaches and war memorials",
    icon: "🏝️",
    image: "/districts/mullaitivu.jpg"
  },

  // Eastern Province (3 districts)
  {
    id: "trincomalee",
    name: "Trincomalee",
    province: "Eastern",
    description: "Natural harbor, hot springs, diving, whale watching",
    icon: "🐋",
    image: "/districts/trincomalee.jpg"
  },
  {
    id: "batticaloa",
    name: "Batticaloa",
    province: "Eastern",
    description: "Lagoons, singing fish, and serene beaches",
    icon: "🎵",
    image: "/districts/batticaloa.jpg"
  },
  {
    id: "ampara",
    name: "Ampara",
    province: "Eastern",
    description: "Surf capital Arugam Bay and ancient Buddhist sites",
    icon: "🏄",
    image: "/districts/ampara.jpg"
  },

  // North Western Province (2 districts)
  {
    id: "kurunegala",
    name: "Kurunegala",
    province: "North Western",
    description: "Rock formations and ancient kingdoms",
    icon: "⛰️",
    image: "/districts/kurunegala.jpg"
  },
  {
    id: "puttalam",
    name: "Puttalam",
    province: "North Western",
    description: "Lagoons, fishing villages, Kalpitiya dolphins",
    icon: "🐬",
    image: "/districts/puttalam.jpg"
  },

  // North Central Province (2 districts)
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    province: "North Central",
    description: "Ancient capital with giant stupas and sacred Bo tree",
    icon: "🕌",
    image: "/districts/anuradhapura.jpg"
  },
  {
    id: "polonnaruwa",
    name: "Polonnaruwa",
    province: "North Central",
    description: "Medieval capital with well-preserved ruins and lakes",
    icon: "🏛️",
    image: "/districts/polonnaruwa.jpg"
  },

  // Uva Province (2 districts)
  {
    id: "badulla",
    name: "Badulla",
    province: "Uva",
    description: "Ella, Ravana Falls, Nine Arches Bridge, tea country",
    icon: "🚆",
    image: "/districts/badulla.jpg"
  },
  {
    id: "monaragala",
    name: "Monaragala",
    province: "Uva",
    description: "Yala National Park and Kataragama sacred site",
    icon: "🐘",
    image: "/districts/monaragala.jpg"
  },

  // Sabaragamuwa Province (2 districts)
  {
    id: "ratnapura",
    name: "Ratnapura",
    province: "Sabaragamuwa",
    description: "Gem mining, rainforests, Adam's Peak pilgrimage",
    icon: "💎",
    image: "/districts/ratnapura.jpg"
  },
  {
    id: "kegalle",
    name: "Kegalle",
    province: "Sabaragamuwa",
    description: "Pinnawala Elephant Orphanage and rubber plantations",
    icon: "🐘",
    image: "/districts/kegalle.jpg"
  },
];

// Comprehensive Places Database - 100+ Attractions across all 25 Districts
export const PLACES: Place[] = [
  // ========== WESTERN PROVINCE ==========
  
  // COLOMBO DISTRICT (9 places)
  {
    id: "colombo-city",
    name: "Colombo City Center",
    districtId: "colombo",
    lat: 6.9271,
    lon: 79.8612,
    category: "City",
    icon: "🏙️",
    description: "Bustling capital with colonial architecture, shopping, nightlife, and cultural sites",
    images: ["/places/colombo/city.jpg", "/places/colombo/lotus-tower.jpg"],
    bestTime: "December to March",
    duration: "2-3 days",
    highlights: [
      "Galle Face Green sunset walks",
      "Gangaramaya Temple complex",
      "Independence Square",
      "Pettah markets shopping",
      "National Museum artifacts",
      "Lotus Tower observation deck"
    ]
  },
  {
    id: "galle-face-green",
    name: "Galle Face Green",
    districtId: "colombo",
    lat: 6.9271,
    lon: 79.8456,
    category: "City",
    icon: "🌅",
    description: "Historic ocean-side urban park with stunning sunsets and street food",
    images: ["/places/colombo/galle-face.jpg"],
    bestTime: "Evening (4pm-8pm)",
    duration: "2-3 hours",
    highlights: ["Sunset views", "Street food stalls", "Kite flying", "Ocean breeze"]
  },
  {
    id: "mount-lavinia-beach",
    name: "Mount Lavinia Beach",
    districtId: "colombo",
    lat: 6.8383,
    lon: 79.8633,
    category: "Beach",
    icon: "🏖️",
    description: "Popular golden sand beach with colonial hotel and seafood restaurants",
    images: ["/places/colombo/mount-lavinia.jpg"],
    bestTime: "November to April",
    duration: "Half to full day",
    highlights: ["Swimming", "Beach sunset", "Fresh seafood", "Water sports", "Colonial Mount Lavinia Hotel"]
  },
  {
    id: "colombo-national-museum",
    name: "National Museum of Colombo",
    districtId: "colombo",
    lat: 6.9108,
    lon: 79.8610,
    category: "Cultural",
    icon: "🏛️",
    description: "Largest museum in Sri Lanka with royal regalia and ancient artifacts",
    images: ["/places/colombo/museum.jpg"],
    bestTime: "Year-round",
    duration: "2-3 hours",
    entryFee: "Rs. 1000",
    highlights: ["Crown jewels", "Ancient masks", "Buddha statues", "Historical manuscripts"]
  },
  {
    id: "viharamahadevi-park",
    name: "Viharamahadevi Park",
    districtId: "colombo",
    lat: 6.9127,
    lon: 79.8613,
    category: "City",
    icon: "🌳",
    description: "Largest park in Colombo with beautiful gardens and walking paths",
    images: ["/places/colombo/park.jpg"],
    bestTime: "Early morning or evening",
    duration: "1-2 hours",
    highlights: ["Giant Buddha statue", "Children's playground", "Jogging tracks", "Picnic areas"]
  },
  {
    id: "red-mosque",
    name: "Jami Ul-Alfar Mosque (Red Mosque)",
    districtId: "colombo",
    lat: 6.9395,
    lon: 79.8536,
    category: "Cultural",
    icon: "🕌",
    description: "Historic red and white candy-striped mosque in Pettah",
    images: ["/places/colombo/red-mosque.jpg"],
    bestTime: "Outside prayer times",
    duration: "30 minutes",
    highlights: ["Unique architecture", "Photo opportunity", "Historic Pettah area"]
  },
  {
    id: "dutch-hospital",
    name: "Dutch Hospital Shopping Precinct",
    districtId: "colombo",
    lat: 6.9343,
    lon: 79.8474,
    category: "City",
    icon: "🛍️",
    description: "Restored colonial building with upscale dining and shopping",
    images: ["/places/colombo/dutch-hospital.jpg"],
    bestTime: "Evening",
    duration: "2-3 hours",
    highlights: ["Fine dining", "Boutique shops", "Colonial architecture", "Nightlife"]
  },
  {
    id: "beira-lake",
    name: "Beira Lake",
    districtId: "colombo",
    lat: 6.9344,
    lon: 79.8540,
    category: "City",
    icon: "🏞️",
    description: "Urban lake with Seema Malaka temple and boat rides",
    images: ["/places/colombo/beira-lake.jpg"],
    bestTime: "Evening",
    duration: "1-2 hours",
    highlights: ["Seema Malaka floating temple", "Boat rides", "Walking paths", "Bird watching"]
  },
  {
    id: "dehiwala-zoo",
    name: "Dehiwala Zoological Garden",
    districtId: "colombo",
    lat: 6.8556,
    lon: 79.8747,
    category: "Wildlife",
    icon: "🦁",
    description: "National zoo with diverse wildlife and daily elephant shows",
    images: ["/places/colombo/zoo.jpg"],
    bestTime: "Early morning",
    duration: "3-4 hours",
    entryFee: "Rs. 3000",
    highlights: ["Elephant performances", "Aquarium", "Butterfly garden", "300+ animal species"]
  },

  // GAMPAHA DISTRICT (8 places)
  {
    id: "negombo-beach",
    name: "Negombo Beach",
    districtId: "gampaha",
    lat: 7.2088,
    lon: 79.8358,
    category: "Beach",
    icon: "🏖️",
    description: "Fishing town beach near airport with Dutch canal and seafood",
    images: ["/places/gampaha/negombo.jpg"],
    bestTime: "November to March",
    duration: "1-2 days",
    highlights: ["Fresh fish market", "Dutch Fort", "Lagoon boat rides", "Beach resorts", "Seafood restaurants"]
  },
  {
    id: "negombo-lagoon",
    name: "Negombo Lagoon",
    districtId: "gampaha",
    lat: 7.2239,
    lon: 79.8492,
    category: "Beach",
    icon: "🛶",
    description: "Large estuarine lagoon with boat tours and bird watching",
    images: ["/places/gampaha/lagoon.jpg"],
    bestTime: "Year-round",
    duration: "Half day",
    highlights: ["Boat safaris", "Mangrove forests", "Bird watching", "Local fishing villages"]
  },
  {
    id: "kelaniya-temple",
    name: "Kelaniya Raja Maha Vihara",
    districtId: "gampaha",
    lat: 6.9553,
    lon: 79.9220,
    category: "Cultural",
    icon: "🛕",
    description: "Ancient Buddhist temple visited by Lord Buddha, with beautiful murals",
    images: ["/places/gampaha/kelaniya.jpg"],
    bestTime: "Year-round, Duruthu Perahera in January",
    duration: "1-2 hours",
    highlights: ["Sacred dagoba", "Colorful murals", "Annual Perahera festival", "Kelani River views"]
  },
  {
    id: "henarathgoda-garden",
    name: "Henarathgoda Botanical Garden",
    districtId: "gampaha",
    lat: 7.0833,
    lon: 80.0000,
    category: "Cultural",
    icon: "🌴",
    description: "Historic garden where first rubber plant in Asia was planted",
    images: ["/places/gampaha/henarathgoda.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    entryFee: "Rs. 200",
    highlights: ["Historic rubber tree", "Orchid collection", "Peaceful walks", "Picnic spots"]
  },
  {
    id: "waikkal-beach",
    name: "Waikkal Beach",
    districtId: "gampaha",
    lat: 7.2800,
    lon: 79.8500,
    category: "Beach",
    icon: "🏝️",
    description: "Quiet beach north of Negombo with fewer crowds",
    images: ["/places/gampaha/waikkal.jpg"],
    bestTime: "November to April",
    duration: "1 day",
    highlights: ["Peaceful beach", "Luxury resorts", "Water sports", "Kite surfing"]
  },
  {
    id: "muthurajawela",
    name: "Muthurajawela Marsh",
    districtId: "gampaha",
    lat: 7.0303,
    lon: 79.8897,
    category: "Wildlife",
    icon: "🦜",
    description: "Unique wetland sanctuary with diverse bird species and boat safaris",
    images: ["/places/gampaha/muthurajawela.jpg"],
    bestTime: "Early morning",
    duration: "2-3 hours",
    entryFee: "Rs. 500 + boat fee",
    highlights: ["Boat safaris", "140+ bird species", "Mangrove ecosystem", "Water monitors"]
  },
  {
    id: "angurukaramulla-temple",
    name: "Angurukaramulla Temple",
    districtId: "gampaha",
    lat: 7.2097,
    lon: 79.8736,
    category: "Cultural",
    icon: "🗿",
    description: "Ancient rock temple with giant Buddha statue in Negombo",
    images: ["/places/gampaha/angurukaramulla.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Giant Buddha statue", "Cave temple", "Ancient murals", "Peaceful ambiance"]
  },
  {
    id: "st-marys-church",
    name: "St. Mary's Church Negombo",
    districtId: "gampaha",
    lat: 7.2093,
    lon: 79.8358,
    category: "Cultural",
    icon: "⛪",
    description: "Grand Catholic church with beautiful paintings and architecture",
    images: ["/places/gampaha/st-marys.jpg"],
    bestTime: "Year-round",
    duration: "30-45 minutes",
    highlights: ["Impressive architecture", "Religious paintings", "Dutch colonial influence"]
  },

  // KALUTARA DISTRICT (5 places)
  {
    id: "kalutara-beach",
    name: "Kalutara Beach",
    districtId: "kalutara",
    lat: 6.5854,
    lon: 79.9607,
    category: "Beach",
    icon: "🏄",
    description: "Palm-fringed beach popular for water sports and surfing",
    images: ["/places/kalutara/beach.jpg"],
    bestTime: "November to April",
    duration: "1-2 days",
    highlights: ["Water sports", "Surfing", "Beach resorts", "Seafood", "Richmond Castle"]
  },
  {
    id: "kalutara-bodhiya",
    name: "Kalutara Bodhiya",
    districtId: "kalutara",
    lat: 6.5833,
    lon: 79.9594,
    category: "Cultural",
    icon: "🛕",
    description: "Only Buddhist temple in the world with hollow dagoba",
    images: ["/places/kalutara/bodhiya.jpg"],
    bestTime: "Year-round",
    duration: "30-45 minutes",
    highlights: ["Hollow dagoba interior", "River views", "Annual Perahera", "Sacred Bo tree"]
  },
  {
    id: "richmond-castle",
    name: "Richmond Castle",
    districtId: "kalutara",
    lat: 6.5903,
    lon: 79.9889,
    category: "History",
    icon: "🏰",
    description: "Edwardian mansion with Indo-Dutch architecture",
    images: ["/places/kalutara/richmond.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    entryFee: "Rs. 500",
    highlights: ["Colonial architecture", "Period furniture", "Manicured gardens", "Photo opportunities"]
  },
  {
    id: "brief-garden",
    name: "Brief Garden",
    districtId: "kalutara",
    lat: 6.5722,
    lon: 80.0194,
    category: "Cultural",
    icon: "🌺",
    description: "Landscaped garden and country home of architect Geoffrey Bawa's brother",
    images: ["/places/kalutara/brief.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    entryFee: "Rs. 1000",
    highlights: ["Tropical gardens", "Sculptures", "Art collection", "Tranquil atmosphere"]
  },
  {
    id: "beruwala-beach",
    name: "Beruwala Beach",
    districtId: "kalutara",
    lat: 6.4789,
    lon: 79.9828,
    category: "Beach",
    icon: "🏖️",
    description: "First Muslim settlement in Sri Lanka, now a beach resort town",
    images: ["/places/kalutara/beruwala.jpg"],
    bestTime: "November to April",
    duration: "1-2 days",
    highlights: ["Golden beaches", "Water sports", "Kechimalai Mosque", "Diving", "Turtle watching"]
  },

  // ========== CENTRAL PROVINCE ==========
  
  // KANDY DISTRICT (10 places)
  {
    id: "temple-of-tooth",
    name: "Temple of the Sacred Tooth Relic",
    districtId: "kandy",
    lat: 7.2936,
    lon: 80.6407,
    category: "Cultural",
    icon: "🛕",
    description: "UNESCO World Heritage site housing Buddha's tooth relic",
    images: ["/places/kandy/temple.jpg"],
    bestTime: "December to April, Esala Perahera in August",
    duration: "2-3 hours",
    entryFee: "Rs. 2000",
    highlights: [
      "Sacred Tooth Relic",
      "Daily puja ceremonies (5:30am, 9:30am, 6:30pm)",
      "Esala Perahera festival",
      "Museum with gifts to temple",
      "Royal Palace complex"
    ]
  },
  {
    id: "kandy-lake",
    name: "Kandy Lake (Bogambara Lake)",
    districtId: "kandy",
    lat: 7.2906,
    lon: 80.6337,
    category: "City",
    icon: "🏞️",
    description: "Artificial lake in the heart of Kandy with scenic walking path",
    images: ["/places/kandy/lake.jpg"],
    bestTime: "Early morning or evening",
    duration: "1-2 hours",
    highlights: ["Circular walking path (3km)", "Sunset views", "Island in center", "Bird watching"]
  },
  {
    id: "peradeniya-botanical",
    name: "Royal Botanical Gardens Peradeniya",
    districtId: "kandy",
    lat: 7.2678,
    lon: 80.5968,
    category: "Cultural",
    icon: "🌺",
    description: "147-acre botanical garden with 4000+ plant species and giant bamboo",
    images: ["/places/kandy/botanical.jpg"],
    bestTime: "Year-round, orchids bloom February-April",
    duration: "2-4 hours",
    entryFee: "Rs. 1500",
    highlights: [
      "Orchid house (300+ species)",
      "Giant Javan fig tree",
      "Avenue of royal palms",
      "Spice garden",
      "Medicinal plants section",
      "Bamboo collection"
    ]
  },
  {
    id: "udawattakele",
    name: "Udawattakele Forest Reserve",
    districtId: "kandy",
    lat: 7.3000,
    lon: 80.6458,
    category: "Wildlife",
    icon: "🌳",
    description: "Historic forest sanctuary in the middle of Kandy with nature trails",
    images: ["/places/kandy/udawattakele.jpg"],
    bestTime: "Early morning",
    duration: "2-3 hours",
    entryFee: "Rs. 500",
    highlights: ["Nature trails", "Monkeys and birds", "Forest monastery", "Kodimale viewpoint"]
  },
  {
    id: "bahirawakanda-temple",
    name: "Bahirawakanda Vihara Buddha Statue",
    districtId: "kandy",
    lat: 7.3047,
    lon: 80.6350,
    category: "Cultural",
    icon: "🗿",
    description: "Giant white Buddha statue with panoramic views of Kandy",
    images: ["/places/kandy/bahirawakanda.jpg"],
    bestTime: "Sunset",
    duration: "1 hour",
    highlights: ["80-foot Buddha statue", "360° views of Kandy", "Sunset photography", "City lights at night"]
  },
  {
    id: "lankatilaka-temple",
    name: "Lankatilaka Temple",
    districtId: "kandy",
    lat: 7.2469,
    lon: 80.5747,
    category: "Cultural",
    icon: "🛕",
    description: "Ancient rock temple with Sinhalese and South Indian architecture",
    images: ["/places/kandy/lankatilaka.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Rock-cut temple", "Ancient frescoes", "Scenic location", "Panoramic views"]
  },
  {
    id: "gadaladeniya-temple",
    name: "Gadaladeniya Temple",
    districtId: "kandy",
    lat: 7.2472,
    lon: 80.5650,
    category: "Cultural",
    icon: "🕌",
    description: "14th century temple with South Indian architectural influence",
    images: ["/places/kandy/gadaladeniya.jpg"],
    bestTime: "Year-round",
    duration: "45 minutes",
    highlights: ["Ancient stone architecture", "Moonstone carvings", "Historic significance"]
  },
  {
    id: "embekka-temple",
    name: "Embekka Devalaya",
    districtId: "kandy",
    lat: 7.2419,
    lon: 80.5581,
    category: "Cultural",
    icon: "🎭",
    description: "14th century temple famous for intricate wood carvings",
    images: ["/places/kandy/embekka.jpg"],
    bestTime: "Year-round",
    duration: "45 minutes",
    highlights: ["Wooden pillars with 514 designs", "Each pillar unique", "Dancers and swans carvings", "No two alike"]
  },
  {
    id: "hunas-falls",
    name: "Hunas Falls",
    districtId: "kandy",
    lat: 7.4167,
    lon: 80.6833,
    category: "Hills",
    icon: "💧",
    description: "Scenic waterfall near Kandy with natural pool for swimming",
    images: ["/places/kandy/hunas.jpg"],
    bestTime: "November to March",
    duration: "Half day",
    entryFee: "Rs. 200",
    highlights: ["Swimming in falls", "Hiking trail", "Picnic spots", "Cool climate"]
  },
  {
    id: "kandy-viewpoint",
    name: "Arthur's Seat Viewpoint",
    districtId: "kandy",
    lat: 7.2611,
    lon: 80.6128,
    category: "Hills",
    icon: "🌄",
    description: "Scenic viewpoint with panoramic views of Kandy and surrounding hills",
    images: ["/places/kandy/viewpoint.jpg"],
    bestTime: "Sunrise or evening",
    duration: "1 hour",
    highlights: ["Kandy city views", "Mountain ranges", "Photography", "Sunrise spot"]
  },

  // MATALE DISTRICT (6 places)
  {
    id: "aluvihare-temple",
    name: "Aluvihare Rock Temple",
    districtId: "matale",
    lat: 7.4667,
    lon: 80.6167,
    category: "Cultural",
    icon: "📜",
    description: "Historic temple where Pali Canon was first written down on palm leaves",
    images: ["/places/matale/aluvihare.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["Cave temple complex", "Buddhist scripture history", "Rock formations", "Ancient manuscripts"]
  },
  {
    id: "sigiriya",
    name: "Sigiriya Rock Fortress",
    districtId: "matale",
    lat: 7.9570,
    lon: 80.7603,
    category: "History",
    icon: "🏔️",
    description: "UNESCO World Heritage ancient rock fortress with frescoes, 8th Wonder of the World",
    images: ["/places/matale/sigiriya.jpg"],
    bestTime: "November to April, early morning (6:30am)",
    duration: "3-4 hours",
    entryFee: "$30 (Rs. 9000)",
    highlights: [
      "Lion's paw entrance",
      "Mirror wall with ancient graffiti",
      "Sigiriya frescoes (heavenly maidens)",
      "Summit palace ruins",
      "Water gardens below",
      "360° panoramic views"
    ]
  },
  {
    id: "dambulla-caves",
    name: "Dambulla Cave Temple (Golden Temple)",
    districtId: "matale",
    lat: 7.8567,
    lon: 80.6489,
    category: "Cultural",
    icon: "🛕",
    description: "UNESCO site with 5 caves containing 150+ Buddha statues and ancient murals",
    images: ["/places/matale/dambulla.jpg"],
    bestTime: "Year-round, early morning",
    duration: "2-3 hours",
    entryFee: "Rs. 2000",
    highlights: ["5 cave temples", "150+ Buddha statues", "Cave ceiling murals", "Giant Golden Buddha", "Panoramic views"]
  },
  {
    id: "nalanda-gedige",
    name: "Nalanda Gedige",
    districtId: "matale",
    lat: 7.6833,
    lon: 80.7667,
    category: "History",
    icon: "🏛️",
    description: "Ancient stone temple blending Hindu and Buddhist architecture",
    images: ["/places/matale/nalanda.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["8th-13th century architecture", "Stone carvings", "Hindu-Buddhist fusion", "Peaceful setting"]
  },
  {
    id: "matale-spice-gardens",
    name: "Matale Spice Gardens",
    districtId: "matale",
    lat: 7.4661,
    lon: 80.6233,
    category: "Cultural",
    icon: "🌿",
    description: "Traditional spice gardens with tours and cooking demonstrations",
    images: ["/places/matale/spice.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["Cinnamon, cardamom, pepper", "Ayurvedic plants", "Guided tours", "Spice products"]
  },
  {
    id: "knuckles-range",
    name: "Knuckles Mountain Range",
    districtId: "matale",
    lat: 7.4500,
    lon: 80.8000,
    category: "Hills",
    icon: "⛰️",
    description: "UNESCO World Heritage biodiversity hotspot with hiking trails",
    images: ["/places/matale/knuckles.jpg"],
    bestTime: "January to April",
    duration: "Full day or multi-day trek",
    entryFee: "Rs. 500 + guide fee",
    highlights: ["Hiking trails", "Endemic species", "Waterfalls", "Mini world's end", "Cloud forests", "Village stays"]
  },

  // NUWARA ELIYA DISTRICT (8 places)
  {
    id: "nuwara-eliya-town",
    name: "Nuwara Eliya Town",
    districtId: "nuwara-eliya",
    lat: 6.9497,
    lon: 80.7891,
    category: "Hills",
    icon: "🏘️",
    description: "Little England - colonial hill station with tea estates and cool climate",
    images: ["/places/nuwara-eliya/town.jpg"],
    bestTime: "December to April",
    duration: "2-3 days",
    highlights: [
      "Colonial architecture",
      "Gregory Lake",
      "Victoria Park",
      "Golf course (oldest in Asia)",
      "Strawberry farms",
      "Cool climate (15°C)"
    ]
  },
  {
    id: "horton-plains",
    name: "Horton Plains National Park",
    districtId: "nuwara-eliya",
    lat: 6.8103,
    lon: 80.7980,
    category: "Hills",
    icon: "🌫️",
    description: "UNESCO World Heritage plateau with World's End cliff and Baker's Falls",
    images: ["/places/nuwara-eliya/horton.jpg"],
    bestTime: "January to March, arrive before 7am",
    duration: "4-5 hours (9km trek)",
    entryFee: "Rs. 3500",
    highlights: [
      "World's End (880m cliff drop)",
      "Baker's Falls",
      "Sambar deer",
      "Cloud forests",
      "Endemic birds",
      "Circular hiking trail"
    ]
  },
  {
    id: "adams-peak",
    name: "Adam's Peak (Sri Pada)",
    districtId: "nuwara-eliya",
    lat: 6.8095,
    lon: 80.4989,
    category: "Hills",
    icon: "⛰️",
    description: "Sacred mountain with footprint shrine, pilgrimage climb at night",
    images: ["/places/nuwara-eliya/adams-peak.jpg"],
    bestTime: "December to May (pilgrimage season)",
    duration: "5-7 hours round trip",
    highlights: [
      "Sacred footprint",
      "Sunrise from summit",
      "5,500 steps climb",
      "Pilgrimage route",
      "Night climb tradition",
      "Shadow phenomenon"
    ]
  },
  {
    id: "hakgala-gardens",
    name: "Hakgala Botanical Garden",
    districtId: "nuwara-eliya",
    lat: 6.9167,
    lon: 80.8167,
    category: "Hills",
    icon: "🌸",
    description: "High-altitude botanical garden with roses, ferns and montane forest",
    images: ["/places/nuwara-eliya/hakgala.jpg"],
    bestTime: "March to May, September to November",
    duration: "2-3 hours",
    entryFee: "Rs. 500",
    highlights: ["Rose garden", "Fern collection", "Japanese garden", "Medicinal plants", "Hakgala rock"]
  },
  {
    id: "pedro-tea-estate",
    name: "Pedro Tea Estate",
    districtId: "nuwara-eliya",
    lat: 6.9500,
    lon: 80.7667,
    category: "Hills",
    icon: "🍃",
    description: "Working tea plantation with factory tours and tastings",
    images: ["/places/nuwara-eliya/pedro.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["Tea factory tour", "Tea tasting", "Scenic plantations", "Tea purchase"]
  },
  {
    id: "ambewela-farm",
    name: "Ambewela Farm",
    districtId: "nuwara-eliya",
    lat: 6.8667,
    lon: 80.8167,
    category: "Hills",
    icon: "🐄",
    description: "New Zealand-style dairy farm with rolling green pastures",
    images: ["/places/nuwara-eliya/ambewela.jpg"],
    bestTime: "December to March",
    duration: "1-2 hours",
    highlights: ["Dairy cows grazing", "Fresh milk products", "Scenic landscape", "Photo opportunities"]
  },
  {
    id: "single-tree-mountain",
    name: "Single Tree Mountain (Pidurutalagala)",
    districtId: "nuwara-eliya",
    lat: 6.9833,
    lon: 80.7667,
    category: "Hills",
    icon: "🗻",
    description: "Highest peak in Sri Lanka at 2,524m, restricted military area",
    images: ["/places/nuwara-eliya/single-tree.jpg"],
    bestTime: "December to April",
    duration: "Half day with permission",
    highlights: ["Highest point in Sri Lanka", "TV/radio towers", "Requires permission", "Panoramic views"]
  },
  {
    id: "lovers-leap",
    name: "Lover's Leap Waterfall",
    districtId: "nuwara-eliya",
    lat: 6.9567,
    lon: 80.7828,
    category: "Hills",
    icon: "💧",
    description: "Scenic waterfall with tragic love story legend",
    images: ["/places/nuwara-eliya/lovers-leap.jpg"],
    bestTime: "Monsoon season (November-January)",
    duration: "1 hour",
    highlights: ["30m waterfall", "Local legend", "Photo spot", "Roadside viewpoint"]
  },

  // ========== SOUTHERN PROVINCE ==========
  
  // GALLE DISTRICT (9 places)
  {
    id: "galle-fort",
    name: "Galle Fort",
    districtId: "galle",
    lat: 6.0270,
    lon: 80.2170,
    category: "History",
    icon: "🏰",
    description: "UNESCO World Heritage Dutch colonial fort with ramparts and lighthouse",
    images: ["/places/galle/fort.jpg"],
    bestTime: "Year-round, sunset on ramparts",
    duration: "Half to full day",
    highlights: [
      "Dutch ramparts walk",
      "Lighthouse",
      "Clock tower",
      "Dutch Reformed Church",
      "Museums and boutiques",
      "Sunset views"
    ]
  },
  {
    id: "unawatuna-beach",
    name: "Unawatuna Beach",
    districtId: "galle",
    lat: 6.0100,
    lon: 80.2500,
    category: "Beach",
    icon: "🏖️",
    description: "Crescent-shaped beach voted one of world's best, snorkeling paradise",
    images: ["/places/galle/unawatuna.jpg"],
    bestTime: "November to April",
    duration: "1-2 days",
    highlights: ["Snorkeling", "Swimming", "Beach restaurants", "Japanese Peace Pagoda", "Jungle Beach nearby"]
  },
  {
    id: "jungle-beach-unawatuna",
    name: "Jungle Beach",
    districtId: "galle",
    lat: 6.0089,
    lon: 80.2594,
    category: "Beach",
    icon: "🌴",
    description: "Secluded beach through jungle path near Unawatuna",
    images: ["/places/galle/jungle-beach.jpg"],
    bestTime: "November to April",
    duration: "Half day",
    highlights: ["Pristine beach", "Jungle trek", "Snorkeling", "Peaceful atmosphere"]
  },
  {
    id: "mirissa-beach",
    name: "Mirissa Beach",
    districtId: "galle",
    lat: 5.9467,
    lon: 80.4686,
    category: "Beach",
    icon: "🐋",
    description: "Best whale watching spot in Sri Lanka, beautiful beach town",
    images: ["/places/galle/mirissa.jpg"],
    bestTime: "November to April (whales Dec-Apr)",
    duration: "1-2 days",
    highlights: [
      "Blue whale watching",
      "Surfing",
      "Beach parties",
      "Coconut tree hill",
      "Fresh seafood",
      "Parrot Rock"
    ]
  },
  {
    id: "koggala-lake",
    name: "Koggala Lake",
    districtId: "galle",
    lat: 5.9872,
    lon: 80.3264,
    category: "Beach",
    icon: "🏝️",
    description: "Large coastal lake with islands, cinnamon plantations, and stilt fishing",
    images: ["/places/galle/koggala.jpg"],
    bestTime: "Year-round",
    duration: "2-3 hours",
    highlights: ["Boat tours", "Temple islands", "Cinnamon island", "Bird watching", "Martin Wickramasinghe Museum"]
  },
  {
    id: "hikkaduwa-beach",
    name: "Hikkaduwa Beach",
    districtId: "galle",
    lat: 6.1392,
    lon: 80.0989,
    category: "Beach",
    icon: "🏄",
    description: "Popular surf town with coral reef and sea turtle sanctuary",
    images: ["/places/galle/hikkaduwa.jpg"],
    bestTime: "November to April",
    duration: "1-2 days",
    highlights: ["Surfing", "Coral sanctuary", "Sea turtles", "Glass-bottom boats", "Beach nightlife"]
  },
  {
    id: "stilt-fishermen",
    name: "Stilt Fishermen of Koggala",
    districtId: "galle",
    lat: 5.9889,
    lon: 80.3336,
    category: "Cultural",
    icon: "🎣",
    description: "Traditional stilt fishing technique unique to Sri Lanka's south coast",
    images: ["/places/galle/stilt-fishing.jpg"],
    bestTime: "Early morning or evening",
    duration: "1-2 hours",
    highlights: ["Traditional fishing method", "Photo opportunities", "Cultural experience", "Beach views"]
  },
  {
    id: "yatagala-temple",
    name: "Yatagala Raja Maha Viharaya",
    districtId: "galle",
    lat: 6.0833,
    lon: 80.2167,
    category: "Cultural",
    icon: "🛕",
    description: "Ancient rock temple with reclining Buddha and murals",
    images: ["/places/galle/yatagala.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Cave temple", "Ancient murals", "Reclining Buddha", "Peaceful setting"]
  },
  {
    id: "handunugoda-tea",
    name: "Handunugoda Tea Estate",
    districtId: "galle",
    lat: 6.0583,
    lon: 80.2083,
    category: "Cultural",
    icon: "🍵",
    description: "Low-country tea estate famous for Virgin White Tea",
    images: ["/places/galle/handunugoda.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["Tea tasting", "Factory tour", "Virgin White Tea", "Tea purchase"]
  },

  // MATARA DISTRICT (6 places)
  {
    id: "matara-fort",
    name: "Matara Fort (Star Fort)",
    districtId: "matara",
    lat: 5.9467,
    lon: 80.5550,
    category: "History",
    icon: "⭐",
    description: "Star-shaped Dutch fort near Matara town",
    images: ["/places/matara/fort.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Star-shaped architecture", "Dutch colonial", "Museum", "Town views"]
  },
  {
    id: "polhena-beach",
    name: "Polhena Beach",
    districtId: "matara",
    lat: 5.9333,
    lon: 80.5617,
    category: "Beach",
    icon: "🏊",
    description: "Protected reef creates natural pool perfect for swimming",
    images: ["/places/matara/polhena.jpg"],
    bestTime: "Year-round",
    duration: "Half day",
    highlights: ["Safe swimming", "Sea turtles", "Snorkeling", "Calm waters", "Family-friendly"]
  },
  {
    id: "dondra-lighthouse",
    name: "Dondra Head Lighthouse",
    districtId: "matara",
    lat: 5.9231,
    lon: 80.5881,
    category: "History",
    icon: "🗼",
    description: "Southernmost point of Sri Lanka with tallest lighthouse",
    images: ["/places/matara/dondra.jpg"],
    bestTime: "Year-round, sunset",
    duration: "1-2 hours",
    highlights: ["Tallest lighthouse (49m)", "Southernmost point", "Ocean views", "Whale watching season"]
  },
  {
    id: "weherahena-temple",
    name: "Weherahena Buddhist Temple",
    districtId: "matara",
    lat: 5.9708,
    lon: 80.5442,
    category: "Cultural",
    icon: "🗿",
    description: "Modern temple with largest seated Buddha statue in Sri Lanka",
    images: ["/places/matara/weherahena.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["Giant Buddha statue (39m)", "Underground tunnel murals", "Modern architecture", "Peaceful gardens"]
  },
  {
    id: "parevi-duwa",
    name: "Parevi Duwa Temple",
    districtId: "matara",
    lat: 5.9500,
    lon: 80.5483,
    category: "Cultural",
    icon: "🏝️",
    description: "Buddhist temple on small island connected by footbridge",
    images: ["/places/matara/parevi.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Island temple", "Footbridge", "Ocean views", "Martin Wickramasinghe's novel setting"]
  },
  {
    id: "wewurukannala",
    name: "Wewurukannala Vihara",
    districtId: "matara",
    lat: 6.0833,
    lon: 80.4833,
    category: "Cultural",
    icon: "👹",
    description: "Temple with tallest Buddha statue and hell chamber displays",
    images: ["/places/matara/wewurukannala.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["50m seated Buddha", "Hell chamber displays", "Colorful statues", "Unique experience"]
  },

  // HAMBANTOTA DISTRICT (7 places)
  {
    id: "yala-national-park",
    name: "Yala National Park",
    districtId: "hambantota",
    lat: 6.3725,
    lon: 81.5189,
    category: "Wildlife",
    icon: "🐆",
    description: "Best park for leopard sightings, diverse wildlife including elephants",
    images: ["/places/hambantota/yala.jpg"],
    bestTime: "February to July (dry season)",
    duration: "Half or full day safari",
    entryFee: "$25 + jeep $40-60",
    highlights: [
      "Highest leopard density",
      "Elephants, sloth bears",
      "300+ bird species",
      "Crocodiles",
      "Beach within park",
      "Ancient stupas"
    ]
  },
  {
    id: "bundala-national-park",
    name: "Bundala National Park",
    districtId: "hambantota",
    lat: 6.1833,
    lon: 81.2000,
    category: "Wildlife",
    icon: "🦅",
    description: "Ramsar wetland with flamingos and migratory birds",
    images: ["/places/hambantota/bundala.jpg"],
    bestTime: "September to March (migratory birds)",
    duration: "Half day",
    entryFee: "$15 + jeep",
    highlights: ["Flamingos", "200+ bird species", "Elephants", "Crocodiles", "Wetland ecosystem"]
  },
  {
    id: "tangalle-beach",
    name: "Tangalle Beach",
    districtId: "hambantota",
    lat: 6.0236,
    lon: 80.7964,
    category: "Beach",
    icon: "🏖️",
    description: "Pristine beaches with golden sand and turtle nesting sites",
    images: ["/places/hambantota/tangalle.jpg"],
    bestTime: "November to April",
    duration: "1-2 days",
    highlights: ["Multiple beaches", "Sea turtles", "Rock pools", "Peaceful atmosphere", "Fresh seafood"]
  },
  {
    id: "rekawa-turtle-beach",
    name: "Rekawa Turtle Sanctuary",
    districtId: "hambantota",
    lat: 6.0667,
    lon: 80.8333,
    category: "Wildlife",
    icon: "🐢",
    description: "Important turtle nesting beach with night watching tours",
    images: ["/places/hambantota/rekawa.jpg"],
    bestTime: "Year-round, night tours",
    duration: "2-3 hours (night)",
    entryFee: "Rs. 500",
    highlights: ["5 turtle species", "Nesting observation", "Conservation project", "Night tours"]
  },
  {
    id: "mulkirigala-temple",
    name: "Mulkirigala Rock Temple",
    districtId: "hambantota",
    lat: 6.1333,
    lon: 80.7333,
    category: "Cultural",
    icon: "⛰️",
    description: "Ancient rock temple complex on 210m high rock",
    images: ["/places/hambantota/mulkirigala.jpg"],
    bestTime: "Year-round, early morning",
    duration: "2-3 hours",
    entryFee: "Rs. 500",
    highlights: ["7 caves and temples", "Ancient frescoes", "Climbing experience", "Panoramic views", "Where Mahavamsa discovered"]
  },
  {
    id: "hambantota-port",
    name: "Hambantota Port & City",
    districtId: "hambantota",
    lat: 6.1244,
    lon: 81.1185,
    category: "City",
    icon: "🚢",
    description: "Modern deep-water port and developing city",
    images: ["/places/hambantota/port.jpg"],
    bestTime: "Year-round",
    duration: "Half day",
    highlights: ["Modern port", "Cricket stadium", "Conference center", "Bird sanctuary nearby"]
  },
  {
    id: "kirinda-temple",
    name: "Kirinda Raja Maha Viharaya",
    districtId: "hambantota",
    lat: 6.2719,
    lon: 81.4431,
    category: "Cultural",
    icon: "🌊",
    description: "Temple on rock overlooking ocean with Viharamahadevi legend",
    images: ["/places/hambantota/kirinda.jpg"],
    bestTime: "Year-round, sunset",
    duration: "1 hour",
    highlights: ["Ocean views", "Historical legend", "Rock temple", "Sunset photography"]
  },

  // ========== NORTHERN PROVINCE ==========
  
  // JAFFNA DISTRICT (7 places)
  {
    id: "jaffna-fort",
    name: "Jaffna Fort",
    districtId: "jaffna",
    lat: 9.6681,
    lon: 80.0083,
    category: "History",
    icon: "🏰",
    description: "Restored Dutch fort overlooking Jaffna lagoon",
    images: ["/places/jaffna/fort.jpg"],
    bestTime: "October to March",
    duration: "2-3 hours",
    highlights: ["Dutch architecture", "Lagoon views", "Historical significance", "Recently restored"]
  },
  {
    id: "nallur-temple",
    name: "Nallur Kandaswamy Temple",
    districtId: "jaffna",
    lat: 9.6833,
    lon: 80.0250,
    category: "Cultural",
    icon: "🪔",
    description: "Most significant Hindu temple in Sri Lanka with grand architecture",
    images: ["/places/jaffna/nallur.jpg"],
    bestTime: "July-August (Nallur Festival)",
    duration: "1-2 hours",
    highlights: ["Gold-plated gopuram", "Daily puja ceremonies", "25-day annual festival", "Tamil culture"]
  },
  {
    id: "delft-island",
    name: "Delft Island (Neduntheevu)",
    districtId: "jaffna",
    lat: 9.4833,
    lon: 79.7667,
    category: "Beach",
    icon: "🐎",
    description: "Remote island with wild horses, baobab trees, and coral walls",
    images: ["/places/jaffna/delft.jpg"],
    bestTime: "October to March",
    duration: "Full day",
    highlights: ["Wild ponies", "Baobab trees", "Coral stone walls", "Dutch fort ruins", "Unique landscape", "Ferry ride"]
  },
  {
    id: "casuarina-beach",
    name: "Casuarina Beach",
    districtId: "jaffna",
    lat: 9.8500,
    lon: 80.2000,
    category: "Beach",
    icon: "🏖️",
    description: "Beautiful northern beach with casuarina tree shade",
    images: ["/places/jaffna/casuarina.jpg"],
    bestTime: "October to March",
    duration: "Half day",
    highlights: ["White sand", "Clear water", "Casuarina trees", "Peaceful atmosphere"]
  },
  {
    id: "nagadeepa-temple",
    name: "Nagadeepa Purana Viharaya",
    districtId: "jaffna",
    lat: 9.5833,
    lon: 79.8333,
    category: "Cultural",
    icon: "🛕",
    description: "Sacred Buddhist temple on Nainativu island",
    images: ["/places/jaffna/nagadeepa.jpg"],
    bestTime: "October to March",
    duration: "Half day with ferry",
    highlights: ["Buddha's visit site", "Island temple", "Ferry journey", "Pilgrimage site"]
  },
  {
    id: "jaffna-library",
    name: "Jaffna Public Library",
    districtId: "jaffna",
    lat: 9.6614,
    lon: 80.0253,
    category: "Cultural",
    icon: "📚",
    description: "Restored iconic library with Tamil heritage collections",
    images: ["/places/jaffna/library.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Rebuilt after 1981 burning", "Colonial architecture", "Tamil manuscripts", "Cultural symbol"]
  },
  {
    id: "keerimalai-springs",
    name: "Keerimalai Springs",
    districtId: "jaffna",
    lat: 9.8167,
    lon: 80.2000,
    category: "Cultural",
    icon: "💧",
    description: "Natural spring water pool with temple, believed to have healing properties",
    images: ["/places/jaffna/keerimalai.jpg"],
    bestTime: "October to March",
    duration: "1-2 hours",
    highlights: ["Fresh water springs", "Hindu temple", "Ocean views", "Traditional bathing spot"]
  },

  // MANNAR DISTRICT (4 places)
  {
    id: "adams-bridge",
    name: "Adam's Bridge (Rama Setu)",
    districtId: "mannar",
    lat: 9.1667,
    lon: 79.4167,
    category: "Beach",
    icon: "🌉",
    description: "Chain of limestone shoals connecting Sri Lanka to India",
    images: ["/places/mannar/adams-bridge.jpg"],
    bestTime: "October to March",
    duration: "Half day",
    highlights: ["India connection", "Mythology significance", "Unique geography", "Remote location"]
  },
  {
    id: "mannar-baobab",
    name: "Giant Baobab Tree",
    districtId: "mannar",
    lat: 8.9811, 
    lon: 79.9042,
    category: "Cultural",
    icon: "🌳",
    description: "Massive 700-year-old African baobab tree",
    images: ["/places/mannar/baobab.jpg"],
    bestTime: "Year-round",
    duration: "30 minutes",
    highlights: ["700+ years old", "African tree species", "Photo opportunity", "Historical significance"]
  },
  {
    id: "mannar-fort",
    name: "Mannar Fort",
    districtId: "mannar",
    lat: 8.9811,
    lon: 79.9042,
    category: "History",
    icon: "🏰",
    description: "Portuguese and Dutch fort on Mannar Island",
    images: ["/places/mannar/fort.jpg"],
    bestTime: "October to March",
    duration: "1 hour",
    highlights: ["Colonial fort", "Coastal views", "Historical site"]
  },
  {
    id: "talaimannar-pier",
    name: "Talaimannar Pier",
    districtId: "mannar",
    lat: 9.1167,
    lon: 79.7167,
    category: "History",
    icon: "🚂",
    description: "Historic pier where ferries once connected to India",
    images: ["/places/mannar/pier.jpg"],
    bestTime: "October to March",
    duration: "1 hour",
    highlights: ["Historic railway", "India connection", "Remote atmosphere", "Abandoned pier"]
  },

  // KILINOCHCHI DISTRICT (3 places)
  {
    id: "kilinochchi-war-memorial",
    name: "Kilinochchi War Memorial",
    districtId: "kilinochchi",
    lat: 9.3833,
    lon: 80.4000,
    category: "History",
    icon: "🕊️",
    description: "Memorial commemorating the civil war and peace",
    images: ["/places/kilinochchi/memorial.jpg"],
    bestTime: "October to March",
    duration: "1-2 hours",
    highlights: ["Historical significance", "Peace memorial", "Recent history", "Reflection site"]
  },
  {
    id: "iranamadu-tank",
    name: "Iranamadu Tank",
    districtId: "kilinochchi",
    lat: 9.5833,
    lon: 80.4167,
    category: "Cultural",
    icon: "💧",
    description: "Large ancient reservoir and important water source",
    images: ["/places/kilinochchi/iranamadu.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["Ancient reservoir", "Bird watching", "Fishing", "Scenic views"]
  },
  {
    id: "kandawala-sanctuary",
    name: "Kandawala Sanctuary",
    districtId: "kilinochchi",
    lat: 9.4333,
    lon: 80.3500,
    category: "Wildlife",
    icon: "🦅",
    description: "Bird sanctuary with diverse wetland species",
    images: ["/places/kilinochchi/kandawala.jpg"],
    bestTime: "November to March",
    duration: "2-3 hours",
    highlights: ["Bird watching", "Wetland ecosystem", "Migratory birds", "Nature trails"]
  },

  // VAVUNIYA DISTRICT (3 places)
  {
    id: "vavuniya-town",
    name: "Vavuniya Town",
    districtId: "vavuniya",
    lat: 8.7514,
    lon: 80.4971,
    category: "City",
    icon: "🏘️",
    description: "Gateway town to northern Sri Lanka with markets and culture",
    images: ["/places/vavuniya/town.jpg"],
    bestTime: "October to March",
    duration: "Half day",
    highlights: ["Local markets", "Gateway to north", "Cultural mix", "Transport hub"]
  },
  {
    id: "madhu-church",
    name: "Madhu Church",
    districtId: "vavuniya",
    lat: 8.8000,
    lon: 80.1667,
    category: "Cultural",
    icon: "⛪",
    description: "Famous Catholic pilgrimage site, Our Lady of Madhu Shrine",
    images: ["/places/vavuniya/madhu.jpg"],
    bestTime: "Year-round, August festival",
    duration: "1-2 hours",
    highlights: ["Catholic pilgrimage", "Annual festival", "Historical church", "Multi-faith visitors"]
  },
  {
    id: "vavuniya-tank",
    name: "Vavuniya Tank",
    districtId: "vavuniya",
    lat: 8.7500,
    lon: 80.5000,
    category: "Cultural",
    icon: "🏞️",
    description: "Ancient irrigation tank with bird watching opportunities",
    images: ["/places/vavuniya/tank.jpg"],
    bestTime: "November to March",
    duration: "1-2 hours",
    highlights: ["Ancient reservoir", "Bird watching", "Sunset views", "Peaceful setting"]
  },

  // MULLAITIVU DISTRICT (3 places)
  {
    id: "mullaitivu-beach",
    name: "Mullaitivu Beach",
    districtId: "mullaitivu",
    lat: 9.2667,
    lon: 80.8167,
    category: "Beach",
    icon: "🏖️",
    description: "Pristine untouched beaches along the northeast coast",
    images: ["/places/mullaitivu/beach.jpg"],
    bestTime: "April to September",
    duration: "Half to full day",
    highlights: ["Pristine beaches", "Few tourists", "Clear waters", "Peaceful atmosphere"]
  },
  {
    id: "nanthi-kadal-lagoon",
    name: "Nanthi Kadal Lagoon",
    districtId: "mullaitivu",
    lat: 9.1833,
    lon: 80.6500,
    category: "Beach",
    icon: "🛶",
    description: "Coastal lagoon with mangroves and fishing villages",
    images: ["/places/mullaitivu/lagoon.jpg"],
    bestTime: "Year-round",
    duration: "2-3 hours",
    highlights: ["Lagoon boat tours", "Mangroves", "Fishing villages", "Bird watching"]
  },
  {
    id: "mullaitivu-memorial",
    name: "Mullaitivu War Memorial",
    districtId: "mullaitivu",
    lat: 9.2672,
    lon: 80.8147,
    category: "History",
    icon: "🕊️",
    description: "Memorial site marking the end of the civil war",
    images: ["/places/mullaitivu/memorial.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Historical significance", "Peace memorial", "Remembrance site", "Recent history"]
  },

  // Continue with remaining districts...
  // (Due to length, adding more condensed entries for remaining districts)

  // ========== EASTERN PROVINCE ==========
  
  // TRINCOMALEE DISTRICT (6 places)
  {
    id: "trinco-harbor",
    name: "Trincomalee Harbor & Town",
    districtId: "trincomalee",
    lat: 8.5711,
    lon: 81.2335,
    category: "City",
    icon: "⚓",
    description: "Natural deep-water harbor, one of the finest in the world",
    images: ["/places/trincomalee/harbor.jpg"],
    bestTime: "April to September",
    duration: "1 day",
    highlights: ["Natural harbor", "Naval base", "Coastal town", "Historical significance"]
  },
  {
    id: "nilaveli-beach",
    name: "Nilaveli Beach",
    districtId: "trincomalee",
    lat: 8.7000,
    lon: 81.1833,
    category: "Beach",
    icon: "🏖️",
    description: "Pristine white sand beach with crystal-clear waters",
    images: ["/places/trincomalee/nilaveli.jpg"],
    bestTime: "April to September",
    duration: "1-2 days",
    highlights: ["White sand", "Clear water", "Snorkeling", "Pigeon Island nearby", "Peaceful atmosphere"]
  },
  {
    id: "pigeon-island",
    name: "Pigeon Island National Park",
    districtId: "trincomalee",
    lat: 8.7167,
    lon: 81.2167,
    category: "Wildlife",
    icon: "🐠",
    description: "Marine national park with coral reefs and snorkeling",
    images: ["/places/trincomalee/pigeon.jpg"],
    bestTime: "April to September",
    duration: "Half day",
    entryFee: "Rs. 3000 + boat",
    highlights: ["Coral reefs", "Snorkeling", "Reef sharks", "Tropical fish", "Two islands"]
  },
  {
    id: "koneswaram-temple",
    name: "Koneswaram Temple (Swami Rock)",
    districtId: "trincomalee",
    lat: 8.5833,
    lon: 81.2333,
    category: "Cultural",
    icon: "🛕",
    description: "Ancient Hindu temple on cliff top overlooking ocean",
    images: ["/places/trincomalee/koneswaram.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["Cliff-top temple", "Ocean views", "Swami Rock", "Ancient Shiva temple", "Sunset spot"]
  },
  {
    id: "hot-wells-kanniya",
    name: "Kanniya Hot Springs",
    districtId: "trincomalee",
    lat: 8.6333,
    lon: 81.1667,
    category: "Cultural",
    icon: "♨️",
    description: "Seven natural hot water wells with unique temperatures",
    images: ["/places/trincomalee/hotsprings.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    entryFee: "Rs. 250",
    highlights: ["7 hot wells", "Each different temperature", "Fresh water", "Archaeological site"]
  },
  {
    id: "uppuveli-beach",
    name: "Uppuveli Beach",
    districtId: "trincomalee",
    lat: 8.6167,
    lon: 81.2000,
    category: "Beach",
    icon: "🌅",
    description: "Long sandy beach near Trinco with water sports",
    images: ["/places/trincomalee/uppuveli.jpg"],
    bestTime: "April to September",
    duration: "Half to full day",
    highlights: ["Swimming", "Diving", "Whale watching", "Beach resorts"]
  },

  // BATTICALOA DISTRICT (3 places)
  {
    id: "batticaloa-lagoon",
    name: "Batticaloa Lagoon",
    districtId: "batticaloa",
    lat: 7.7306,
    lon: 81.6978,
    category: "Beach",
    icon: "🎵",
    description: "Famous for singing fish phenomenon heard on full moon nights",
    images: ["/places/batticaloa/lagoon.jpg"],
    bestTime: "Full moon nights (April-September)",
    duration: "Half day",
    highlights: ["Singing fish", "Boat tours", "Islands", "Bird watching", "Unique phenomenon"]
  },
  {
    id: "passikudah-beach",
    name: "Passikudah Beach",
    districtId: "batticaloa",
    lat: 7.9333,
    lon: 81.5667,
    category: "Beach",
    icon: "🏖️",
    description: "Shallow bay perfect for swimming, one of Asia's safest beaches",
    images: ["/places/batticaloa/passikudah.jpg"],
    bestTime: "April to September",
    duration: "1-2 days",
    highlights: ["Shallow water (walk 200m)", "Safe swimming", "Beach resorts", "Water sports"]
  },
  {
    id: "kallady-beach",
    name: "Kallady Beach",
    districtId: "batticaloa",
    lat: 7.7167,
    lon: 81.7000,
    category: "Beach",
    icon: "🌊",
    description: "Town beach with iconic Lady Manning Bridge views",
    images: ["/places/batticaloa/kallady.jpg"],
    bestTime: "April to September",
    duration: "Half day",
    highlights: ["Town beach", "Bridge views", "Sunset", "Local atmosphere"]
  },

  // AMPARA DISTRICT (4 places)
  {
    id: "arugam-bay",
    name: "Arugam Bay",
    districtId: "ampara",
    lat: 6.8400,
    lon: 81.8364,
    category: "Beach",
    icon: "🏄",
    description: "World-famous surf spot and backpacker paradise",
    images: ["/places/ampara/arugambay.jpg"],
    bestTime: "April to October (surf season May-Sep)",
    duration: "2-7 days",
    highlights: [
      "World-class surfing",
      "Main Point surf break",
      "Beach parties",
      "Laid-back vibe",
      "Nearby lagoons",
      "Elephant Rock"
    ]
  },
  {
    id: "lahugala-park",
    name: "Lahugala National Park",
    districtId: "ampara",
    lat: 7.1500,
    lon: 81.7167,
    category: "Wildlife",
    icon: "🐘",
    description: "Small park famous for elephant herds feeding on grass",
    images: ["/places/ampara/lahugala.jpg"],
    bestTime: "June to September",
    duration: "2-3 hours",
    entryFee: "Rs. 1500",
    highlights: ["Elephant herds", "Beru grass feeding", "Easy viewing", "Small park"]
  },
  {
    id: "pottuvil-lagoon",
    name: "Pottuvil Lagoon",
    districtId: "ampara",
    lat: 6.8833,
    lon: 81.8333,
    category: "Wildlife",
    icon: "🦅",
    description: "Bird sanctuary with boat safaris near Arugam Bay",
    images: ["/places/ampara/pottuvil.jpg"],
    bestTime: "Year-round, best early morning",
    duration: "2-3 hours",
    highlights: ["Boat safaris", "Bird watching", "Crocodiles", "Elephants", "Sunrise tours"]
  },
  {
    id: "muhudu-maha-viharaya",
    name: "Muhudu Maha Viharaya",
    districtId: "ampara",
    lat: 6.8667,
    lon: 81.8500,
    category: "Cultural",
    icon: "🛕",
    description: "Ancient seaside temple where Buddha is believed to have visited",
    images: ["/places/ampara/muhudu.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Beach temple", "Ancient ruins", "Buddha's visit site", "Peaceful location"]
  },

  // ========== NORTH CENTRAL PROVINCE ==========
  
  // ANURADHAPURA DISTRICT (6 places)
  {
    id: "anuradhapura-sacred-city",
    name: "Anuradhapura Sacred City",
    districtId: "anuradhapura",
    lat: 8.3114,
    lon: 80.4037,
    category: "History",
    icon: "🕌",
    description: "UNESCO World Heritage ancient capital with giant stupas and sacred Bo tree",
    images: ["/places/anuradhapura/city.jpg"],
    bestTime: "December to March",
    duration: "Full day or 2 days",
    entryFee: "$25",
    highlights: [
      "Sri Maha Bodhi (sacred Bo tree)",
      "Ruwanwelisaya stupa",
      "Jetavanaramaya (world's tallest stupa)",
      "Abhayagiri monastery",
      "Twin ponds (Kuttam Pokuna)",
      "Moonstone carvings"
    ]
  },
  {
    id: "mihintale",
    name: "Mihintale",
    districtId: "anuradhapura",
    lat: 8.3508,
    lon: 80.5069,
    category: "Cultural",
    icon: "⛰️",
    description: "Cradle of Buddhism in Sri Lanka, mountain with ancient stupas",
    images: ["/places/anuradhapura/mihintale.jpg"],
    bestTime: "December to March, full moon day",
    duration: "Half day",
    entryFee: "Rs. 500",
    highlights: ["1,840 steps climb", "Where Buddhism introduced", "Ancient stupas", "Panoramic views", "Hospital ruins"]
  },
  {
    id: "wilpattu-park",
    name: "Wilpattu National Park",
    districtId: "anuradhapura",
    lat: 8.5000,
    lon: 80.0000,
    category: "Wildlife",
    icon: "🐆",
    description: "Largest national park with leopards and natural lakes (villus)",
    images: ["/places/anuradhapura/wilpattu.jpg"],
    bestTime: "February to October",
    duration: "Half or full day safari",
    entryFee: "$25 + jeep",
    highlights: ["Leopards", "Natural lakes (villus)", "Elephants", "Sloth bears", "Largest park"]
  },
  {
    id: "ritigala",
    name: "Ritigala Strict Nature Reserve",
    districtId: "anuradhapura",
    lat: 8.1500,
    lon: 80.7000,
    category: "History",
    icon: "🏛️",
    description: "Ancient monastery ruins in mountain forest reserve",
    images: ["/places/anuradhapura/ritigala.jpg"],
    bestTime: "December to March",
    duration: "Half day",
    entryFee: "Rs. 500",
    highlights: ["Ancient monastery", "Forest reserve", "Unique microclimate", "Stone pathways", "Meditation sites"]
  },
  {
    id: "aukana-buddha",
    name: "Aukana Buddha Statue",
    districtId: "anuradhapura",
    lat: 8.0667,
    lon: 80.6500,
    category: "Cultural",
    icon: "🗿",
    description: "Masterpiece standing Buddha statue carved from single rock",
    images: ["/places/anuradhapura/aukana.jpg"],
    bestTime: "Year-round, sunrise",
    duration: "1 hour",
    highlights: ["12m tall statue", "Single rock carving", "5th century", "Architectural masterpiece"]
  },
  {
    id: "kala-wewa",
    name: "Kala Wewa Reservoir",
    districtId: "anuradhapura",
    lat: 8.0333,
    lon: 80.4167,
    category: "Cultural",
    icon: "💧",
    description: "Ancient reservoir built in 5th century, engineering marvel",
    images: ["/places/anuradhapura/kalawewa.jpg"],
    bestTime: "Year-round",
    duration: "1-2 hours",
    highlights: ["Ancient engineering", "Birdwatching", "Sunset views", "Historical significance"]
  },

  // POLONNARUWA DISTRICT (5 places)
  {
    id: "polonnaruwa-ancient-city",
    name: "Polonnaruwa Ancient City",
    districtId: "polonnaruwa",
    lat: 7.9403,
    lon: 81.0188,
    category: "History",
    icon: "🏛️",
    description: "UNESCO World Heritage medieval capital with well-preserved ruins",
    images: ["/places/polonnaruwa/city.jpg"],
    bestTime: "December to March",
    duration: "Full day",
    entryFee: "$25",
    highlights: [
      "Gal Vihara rock Buddhas",
      "Royal Palace complex",
      "Vatadage circular relic house",
      "Parakrama Samudra lake",
      "Lotus Pond",
      "Stone carvings"
    ]
  },
  {
    id: "minneriya-park",
    name: "Minneriya National Park",
    districtId: "polonnaruwa",
    lat: 8.0333,
    lon: 80.8833,
    category: "Wildlife",
    icon: "🐘",
    description: "Famous for elephant gathering, 200-300 elephants in dry season",
    images: ["/places/polonnaruwa/minneriya.jpg"],
    bestTime: "July to September (gathering)",
    duration: "Half day safari",
    entryFee: "$20 + jeep",
    highlights: ["Elephant gathering", "200+ elephants", "Ancient reservoir", "Bird watching"]
  },
  {
    id: "kaudulla-park",
    name: "Kaudulla National Park",
    districtId: "polonnaruwa",
    lat: 8.1167,
    lon: 80.8667,
    category: "Wildlife",
    icon: "🐘",
    description: "Alternative to Minneriya for elephant herds",
    images: ["/places/polonnaruwa/kaudulla.jpg"],
    bestTime: "August to October",
    duration: "Half day safari",
    entryFee: "$20 + jeep",
    highlights: ["Elephants", "Ancient tank", "Less crowded than Minneriya", "Dry season gathering"]
  },
  {
    id: "girithale-tanks",
    name: "Girithale Ancient Tanks",
    districtId: "polonnaruwa",
    lat: 8.1000,
    lon: 81.0000,
    category: "History",
    icon: "💧",
    description: "Ancient irrigation system with scenic reservoir views",
    images: ["/places/polonnaruwa/girithale.jpg"],
    bestTime: "Year-round, sunset",
    duration: "1-2 hours",
    highlights: ["Ancient engineering", "Sunset views", "Peaceful atmosphere", "Bird watching"]
  },
  {
    id: "medirigiriya",
    name: "Medirigiriya Vatadage",
    districtId: "polonnaruwa",
    lat: 7.9667,
    lon: 81.0167,
    category: "History",
    icon: "⭕",
    description: "Circular relic house with impressive stone pillars",
    images: ["/places/polonnaruwa/medirigiriya.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    entryFee: "Rs. 500",
    highlights: ["Circular structure", "Stone pillars", "Moonstones", "Ancient architecture"]
  },

  // ========== UVA PROVINCE ==========
  
  // BADULLA DISTRICT (8 places)
  {
    id: "ella-town",
    name: "Ella",
    districtId: "badulla",
    lat: 6.8667,
    lon: 81.0467,
    category: "Hills",
    icon: "🏔️",
    description: "Backpacker paradise with stunning views, waterfalls, and train rides",
    images: ["/places/badulla/ella.jpg"],
    bestTime: "December to March",
    duration: "2-4 days",
    highlights: [
      "Nine Arches Bridge",
      "Ella Rock hike",
      "Little Adam's Peak",
      "Ravana Falls",
      "Tea plantations",
      "Scenic train ride"
    ]
  },
  {
    id: "nine-arches-bridge",
    name: "Nine Arches Bridge",
    districtId: "badulla",
    lat: 6.8714,
    lon: 81.0589,
    category: "History",
    icon: "🌉",
    description: "Iconic stone bridge surrounded by tea plantations",
    images: ["/places/badulla/ninearches.jpg"],
    bestTime: "Year-round, train passes 9am and 3pm",
    duration: "1-2 hours",
    highlights: ["Stone bridge", "Train passing", "Tea estates", "Most photographed spot", "30-minute walk from Ella"]
  },
  {
    id: "ella-rock",
    name: "Ella Rock",
    districtId: "badulla",
    lat: 6.8831,
    lon: 81.0294,
    category: "Hills",
    icon: "⛰️",
    description: "Challenging hike with 360° mountain and valley views",
    images: ["/places/badulla/ellarock.jpg"],
    bestTime: "December to March, early morning",
    duration: "4-5 hours round trip",
    highlights: ["Hiking trail", "Panoramic views", "1,041m elevation", "Through tea estates"]
  },
  {
    id: "little-adams-peak",
    name: "Little Adam's Peak",
    districtId: "badulla",
    lat: 6.8622,
    lon: 81.0297,
    category: "Hills",
    icon: "🥾",
    description: "Easy hike with spectacular 360° views of Ella Gap",
    images: ["/places/badulla/littleadams.jpg"],
    bestTime: "Year-round, sunrise or sunset",
    duration: "1-2 hours round trip",
    highlights: ["Easy hike (45min)", "360° views", "Ella Gap", "Beginner-friendly", "Sunrise/sunset spot"]
  },
  {
    id: "ravana-falls",
    name: "Ravana Falls",
    districtId: "badulla",
    lat: 6.8406,
    lon: 81.0514,
    category: "Hills",
    icon: "💧",
    description: "Popular waterfall with Ramayana legend, swimming pool",
    images: ["/places/badulla/ravana.jpg"],
    bestTime: "November to March (wet season)",
    duration: "1 hour",
    highlights: ["25m waterfall", "Swimming", "Ramayana connection", "Roadside location"]
  },
  {
    id: "demodara-loop",
    name: "Demodara Loop & Nine Arches",
    districtId: "badulla",
    lat: 6.8833,
    lon: 81.0667,
    category: "History",
    icon: "🚂",
    description: "Railway station where track loops under itself",
    images: ["/places/badulla/demodara.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Unique railway loop", "Engineering marvel", "Train passes under itself", "Near Nine Arches"]
  },
  {
    id: "lipton-seat",
    name: "Lipton's Seat",
    districtId: "badulla",
    lat: 6.7667,
    lon: 80.9333,
    category: "Hills",
    icon: "🍃",
    description: "Viewpoint where Sir Thomas Lipton surveyed his tea empire",
    images: ["/places/badulla/lipton.jpg"],
    bestTime: "December to March, sunrise",
    duration: "Half day trip from Haputale",
    highlights: ["Sunrise views", "Tea plantations", "5 provinces visible", "Historic significance"]
  },
  {
    id: "diyaluma-falls",
    name: "Diyaluma Falls",
    districtId: "badulla",
    lat: 6.7833,
    lon: 81.0333,
    category: "Hills",
    icon: "💧",
    description: "Second-highest waterfall in Sri Lanka with natural pools",
    images: ["/places/badulla/diyaluma.jpg"],
    bestTime: "November to March",
    duration: "Half day",
    highlights: ["220m tall", "Natural infinity pools", "Swimming", "Hiking to top", "Scenic drive"]
  },

  // MONARAGALA DISTRICT (3 places)
  {
    id: "kataragama-temple",
    name: "Kataragama Temple Complex",
    districtId: "monaragala",
    lat: 6.4133,
    lon: 81.3342,
    category: "Cultural",
    icon: "🕉️",
    description: "Sacred multi-faith pilgrimage site with Buddhist, Hindu, and Muslim shrines",
    images: ["/places/monaragala/kataragama.jpg"],
    bestTime: "July-August (Esala festival)",
    duration: "Half to full day",
    highlights: [
      "Multi-faith complex",
      "Maha Devale shrine",
      "Buddhist dagoba",
      "Mosque",
      "Annual Esala festival",
      "River rituals"
    ]
  },
  {
    id: "yala-block-ii",
    name: "Yala National Park Block II",
    districtId: "monaragala",
    lat: 6.4167,
    lon: 81.5500,
    category: "Wildlife",
    icon: "🐆",
    description: "Less crowded section of Yala with wildlife",
    images: ["/places/monaragala/yala2.jpg"],
    bestTime: "February to July",
    duration: "Half day safari",
    entryFee: "$25 + jeep",
    highlights: ["Leopards", "Less tourists", "Elephants", "Pristine nature"]
  },
  {
    id: "buduruwagala",
    name: "Buduruwagala",
    districtId: "monaragala",
    lat: 6.7167,
    lon: 81.0500,
    category: "History",
    icon: "🗿",
    description: "Seven colossal Buddha figures carved on rock face",
    images: ["/places/monaragala/buduruwagala.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    entryFee: "Rs. 500",
    highlights: ["15m tall Buddha", "7 figures", "10th century", "Ancient rock carvings"]
  },

  // ========== SABARAGAMUWA PROVINCE ==========
  
  // RATNAPURA DISTRICT (5 places)
  {
    id: "ratnapura-gem-city",
    name: "Ratnapura Gem City",
    districtId: "ratnapura",
    lat: 6.6828,
    lon: 80.3992,
    category: "City",
    icon: "💎",
    description: "Gem capital of Sri Lanka, sapphire and ruby mining",
    images: ["/places/ratnapura/gems.jpg"],
    bestTime: "Year-round",
    duration: "1-2 days",
    highlights: [
      "Gem mines tours",
      "Gem markets",
      "Gem museums",
      "Buying gems",
      "Mining demonstrations"
    ]
  },
  {
    id: "adams-peak-ratnapura",
    name: "Adam's Peak from Ratnapura Side",
    districtId: "ratnapura",
    lat: 6.8095,
    lon: 80.4989,
    category: "Hills",
    icon: "⛰️",
    description: "Main pilgrimage route to sacred mountain",
    images: ["/places/ratnapura/adamspeak.jpg"],
    bestTime: "December to May",
    duration: "6-8 hours round trip",
    highlights: ["Pilgrimage climb", "Sacred footprint", "Sunrise", "Main route", "Religious significance"]
  },
  {
    id: "sinharaja-forest",
    name: "Sinharaja Forest Reserve",
    districtId: "ratnapura",
    lat: 6.4000,
    lon: 80.5000,
    category: "Wildlife",
    icon: "🌳",
    description: "UNESCO World Heritage rainforest with endemic species",
    images: ["/places/ratnapura/sinharaja.jpg"],
    bestTime: "January to April, August to September",
    duration: "Full day trek",
    entryFee: "Rs. 1000 + guide",
    highlights: [
      "Biodiversity hotspot",
      "Endemic birds",
      "Rainforest trek",
      "Leeches (bring salt)",
      "Bird watching paradise",
      "UNESCO site"
    ]
  },
  {
    id: "belihuloya",
    name: "Belihuloya",
    districtId: "ratnapura",
    lat: 6.7167,
    lon: 80.7167,
    category: "Hills",
    icon: "🏞️",
    description: "Scenic mountain village with waterfalls and adventure activities",
    images: ["/places/ratnapura/belihuloya.jpg"],
    bestTime: "December to March",
    duration: "1-2 days",
    highlights: ["Waterfalls", "White water rafting", "Hiking trails", "Tea estates", "Peaceful village"]
  },
  {
    id: "bopath-ella",
    name: "Bopath Ella Falls",
    districtId: "ratnapura",
    lat: 6.7500,
    lon: 80.4000,
    category: "Hills",
    icon: "💧",
    description: "Bo-leaf shaped waterfall near Ratnapura",
    images: ["/places/ratnapura/bopath.jpg"],
    bestTime: "November to February",
    duration: "1-2 hours",
    highlights: ["Unique shape", "Swimming", "Easy access", "Picnic spot"]
  },

  // KEGALLE DISTRICT (4 places)
  {
    id: "pinnawala-elephant",
    name: "Pinnawala Elephant Orphanage",
    districtId: "kegalle",
    lat: 7.2967,
    lon: 80.3900,
    category: "Wildlife",
    icon: "🐘",
    description: "World's largest elephant orphanage and breeding center",
    images: ["/places/kegalle/pinnawala.jpg"],
    bestTime: "Year-round, feeding 9:15am, bathing 10am & 2pm",
    duration: "Half day",
    entryFee: "Rs. 3000",
    highlights: [
      "70+ elephants",
      "River bathing time",
      "Baby elephants",
      "Bottle feeding",
      "Breeding program",
      "Photography"
    ]
  },
  {
    id: "utuwankanda",
    name: "Utuwankanda",
    districtId: "kegalle",
    lat: 7.2833,
    lon: 80.3500,
    category: "Hills",
    icon: "🗻",
    description: "Mini Adam's Peak with Buddha statue and 360° views",
    images: ["/places/kegalle/utuwankanda.jpg"],
    bestTime: "Year-round",
    duration: "2-3 hours",
    highlights: ["Easy hike", "Buddha statue", "Panoramic views", "Less crowded"]
  },
  {
    id: "belilena-cave",
    name: "Belilena Cave",
    districtId: "kegalle",
    lat: 7.2000,
    lon: 80.4000,
    category: "History",
    icon: "🦴",
    description: "Prehistoric cave with evidence of 32,000-year-old human habitation",
    images: ["/places/kegalle/belilena.jpg"],
    bestTime: "Year-round",
    duration: "1 hour",
    highlights: ["Prehistoric site", "Archaeological finds", "Ancient humans", "Cave exploration"]
  },
  {
    id: "ambuluwawa-tower",
    name: "Ambuluwawa Tower",
    districtId: "kegalle",
    lat: 7.2667,
    lon: 80.5333,
    category: "Hills",
    icon: "🗼",
    description: "Multi-faith temple with spiral tower offering 360° mountain views",
    images: ["/places/kegalle/ambuluwawa.jpg"],
    bestTime: "Year-round, clear days",
    duration: "2-3 hours",
    entryFee: "Rs. 200",
    highlights: ["Spiral tower climb", "360° views", "Multi-faith complex", "Mountain peak", "Scenic drive"]
  },

  // ========== NORTH WESTERN PROVINCE ==========
  
  // KURUNEGALA DISTRICT (3 places)
  {
    id: "kurunegala-rocks",
    name: "Kurunegala Rock Formations",
    districtId: "kurunegala",
    lat: 7.4867,
    lon: 80.3636,
    category: "Hills",
    icon: "⛰️",
    description: "Town surrounded by eight giant rock formations named after animals",
    images: ["/places/kurunegala/rocks.jpg"],
    bestTime: "Year-round",
    duration: "Half day",
    highlights: ["Elephant Rock (Ethagala)", "Tortoise Rock", "Eight rocks", "City views", "Legends"]
  },
  {
    id: "dambadeniya",
    name: "Dambadeniya Ancient City",
    districtId: "kurunegala",
    lat: 7.4667,
    lon: 80.1500,
    category: "History",
    icon: "🏛️",
    description: "Medieval capital with royal palace ruins",
    images: ["/places/kurunegala/dambadeniya.jpg"],
    bestTime: "Year-round",
    duration: "2-3 hours",
    highlights: ["Ancient capital", "Royal palace ruins", "Temple with tooth relic history", "Panoramic views"]
  },
  {
    id: "yapahuwa",
    name: "Yapahuwa Rock Fortress",
    districtId: "kurunegala",
    lat: 7.8167,
    lon: 80.3667,
    category: "History",
    icon: "🏰",
    description: "Medieval fortress rock with ornate stone stairway",
    images: ["/places/kurunegala/yapahuwa.jpg"],
    bestTime: "December to March",
    duration: "2-3 hours",
    entryFee: "Rs. 500",
    highlights: ["Rock fortress", "Ornate stairway", "Ancient capital", "Museum", "Tooth relic history"]
  },

  // PUTTALAM DISTRICT (3 places)
  {
    id: "kalpitiya",
    name: "Kalpitiya",
    districtId: "puttalam",
    lat: 8.2333,
    lon: 79.7667,
    category: "Beach",
    icon: "🐬",
    description: "Dolphin watching paradise and kite surfing hub",
    images: ["/places/puttalam/kalpitiya.jpg"],
    bestTime: "November to March (dolphins), May-Oct (kite surfing)",
    duration: "2-3 days",
    highlights: [
      "Dolphin watching (spinner dolphins)",
      "Kite surfing",
      "Dutch Fort",
      "Bar Reef snorkeling",
      "Lagoon boat tours",
      "Pristine beaches"
    ]
  },
  {
    id: "wilpattu-west",
    name: "Wilpattu West Entrance",
    districtId: "puttalam",
    lat: 8.4500,
    lon: 80.0000,
    category: "Wildlife",
    icon: "🐆",
    description: "Access to largest national park from Puttalam side",
    images: ["/places/puttalam/wilpattu.jpg"],
    bestTime: "February to October",
    duration: "Full day safari",
    entryFee: "$25 + jeep",
    highlights: ["Leopards", "Natural lakes", "Less crowded entrance", "Wildlife"]
  },
  {
    id: "anawilundawa-wetland",
    name: "Anawilundawa Wetland Sanctuary",
    districtId: "puttalam",
    lat: 7.6833,
    lon: 79.8667,
    category: "Wildlife",
    icon: "🦜",
    description: "Ramsar wetland with diverse bird species",
    images: ["/places/puttalam/anawilundawa.jpg"],
    bestTime: "November to March (migratory birds)",
    duration: "2-3 hours",
    highlights: ["Bird sanctuary", "150+ bird species", "Wetland ecosystem", "Migratory birds"]
  }
];

// Helper functions
export const getDistrictsByProvince = (province: Province) => 
  DISTRICTS.filter(d => d.province === province);

export const getPlacesByDistrict = (districtId: string) =>
  PLACES.filter(p => p.districtId === districtId);

export const getDistrictById = (id: string) =>
  DISTRICTS.find(d => d.id === id);

export const getAllProvinces = (): Province[] => [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa"
];
