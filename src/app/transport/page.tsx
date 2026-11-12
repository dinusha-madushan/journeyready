"use client";
import { useState } from "react";
import { Card } from "@/components/ui";
import { 
  TRAIN_ROUTES, 
  BUS_ROUTES, 
  RAILWAY_STATIONS,
  searchRoutes,
  TransportRoute,
  TransportType,
  TRANSPORT_TYPES,
  CLASS_INFO
} from "@/lib/transport";

export default function TransportPage() {
  const [transportType, setTransportType] = useState<TransportType | "all">("all");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<TransportRoute | null>(null);

  // Get all routes based on type
  const allRoutes = transportType === "train" 
    ? TRAIN_ROUTES 
    : transportType === "bus" 
    ? BUS_ROUTES 
    : [...TRAIN_ROUTES, ...BUS_ROUTES];

  // Filter routes based on search
  const filteredRoutes = allRoutes.filter(route => {
    const matchesFrom = !searchFrom || route.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchesTo = !searchTo || route.to.toLowerCase().includes(searchTo.toLowerCase());
    return matchesFrom && matchesTo;
  });

  // Sort by departure time
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    if (a.departure === "Frequent") return 1;
    if (b.departure === "Frequent") return -1;
    return a.departure.localeCompare(b.departure);
  });

  return (
    <div className="grid gap-5">
      {/* Header */}
      <Card>
        <h1>🚆 Public Transport</h1>
        <p className="mb-4">
          Find trains and buses across Sri Lanka with schedules, fares, and routes
        </p>

        {/* Transport Type Filter */}
        <div className="row mb-4">
          {TRANSPORT_TYPES.map((type) => (
            <button
              key={type.id}
              className={`chip ${transportType === type.id ? "on" : ""}`}
              onClick={() => setTransportType(type.id as any)}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>

        {/* Search Filters */}
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold">From</label>
            <input
              type="text"
              placeholder="e.g., Colombo, Kandy, Galle..."
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
              className="inp w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">To</label>
            <input
              type="text"
              placeholder="e.g., Ella, Jaffna, Trincomalee..."
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
              className="inp w-full"
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="mt-3 text-sm opacity-75">
          {sortedRoutes.length} route{sortedRoutes.length !== 1 ? "s" : ""} found
        </p>
      </Card>

      {/* Route Details Modal */}
      {selectedRoute && (
        <Card className="pink">
          <div className="row mb-3">
            <h2 className="!mb-0">Route Details</h2>
            <button className="btn btn-sm" onClick={() => setSelectedRoute(null)}>
              ✕ Close
            </button>
          </div>
          
          <div className="mb-3 rounded-xl bg-white/80 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-2xl">
                {selectedRoute.type === "train" ? "🚂" : "🚌"}
              </span>
              <span 
                className="rounded-full px-3 py-1 text-xs font-bold text-white"
                style={{ backgroundColor: CLASS_INFO[selectedRoute.class].color }}
              >
                {CLASS_INFO[selectedRoute.class].label}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="text-lg font-bold">{selectedRoute.from}</div>
              <div className="my-2 flex items-center gap-2">
                <div className="text-3xl font-bold">{selectedRoute.departure}</div>
                <div className="text-2xl opacity-50">→</div>
                <div className="text-3xl font-bold">{selectedRoute.arrival}</div>
              </div>
              <div className="text-lg font-bold">{selectedRoute.to}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="font-semibold opacity-75">Duration</div>
                <div className="text-lg font-bold">⏱️ {selectedRoute.duration}</div>
              </div>
              <div>
                <div className="font-semibold opacity-75">Fare</div>
                <div className="text-lg font-bold">💵 LKR {selectedRoute.fare.toLocaleString()}</div>
              </div>
              {selectedRoute.distance && (
                <div>
                  <div className="font-semibold opacity-75">Distance</div>
                  <div className="text-lg font-bold">📍 {selectedRoute.distance} km</div>
                </div>
              )}
              {selectedRoute.frequency && (
                <div>
                  <div className="font-semibold opacity-75">Frequency</div>
                  <div className="text-lg font-bold">🔄 {selectedRoute.frequency}</div>
                </div>
              )}
            </div>
          </div>
          
          {selectedRoute.operator && (
            <p className="mb-2">
              <strong>Operator:</strong> {selectedRoute.operator}
            </p>
          )}
          
          {selectedRoute.notes && (
            <p className="mb-2">
              <strong>ℹ️ Note:</strong> {selectedRoute.notes}
            </p>
          )}
          
          {selectedRoute.stops && selectedRoute.stops.length > 0 && (
            <div>
              <p className="mb-2 font-semibold">Stops:</p>
              <div className="flex flex-wrap gap-2">
                {selectedRoute.stops.map((stop, i) => (
                  <span key={i} className="rounded-lg bg-white/60 px-2 py-1 text-xs">
                    {stop}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Routes List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedRoutes.length === 0 ? (
          <Card className="col-span-full text-center">
            <p className="text-lg opacity-75">
              No routes found. Try different search terms.
            </p>
          </Card>
        ) : (
          sortedRoutes.map((route) => (
            <div 
              key={route.id}
              onClick={() => setSelectedRoute(route)}
            >
              <Card className="cursor-pointer transition-all hover:scale-105">
                <div className="row mb-3">
                  <span className="text-3xl">
                    {route.type === "train" ? "🚂" : "🚌"}
                  </span>
                  <span 
                    className="rounded-full px-2 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: CLASS_INFO[route.class].color }}
                  >
                    {CLASS_INFO[route.class].label}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="mb-1 font-bold">{route.from}</div>
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <span>{route.departure}</span>
                    <span className="text-xl opacity-50">→</span>
                    <span>{route.arrival}</span>
                  </div>
                  <div className="font-bold">{route.to}</div>
                </div>
                
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="opacity-75">⏱️ {route.duration}</span>
                  <span className="font-bold text-green-600">
                    LKR {route.fare.toLocaleString()}
                  </span>
                </div>
                
                {route.frequency && (
                  <p className="text-xs opacity-75">🔄 {route.frequency}</p>
                )}
                
                {route.notes && (
                  <p className="mt-2 text-xs italic opacity-75">
                    {route.notes.slice(0, 60)}
                    {route.notes.length > 60 ? "..." : ""}
                  </p>
                )}
                
                <button className="btn btn-sm mt-3 w-full">
                  View Details →
                </button>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Quick Tips */}
      <Card className="cream">
        <h2>💡 Travel Tips</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="mb-1 font-bold">🚂 Trains</h3>
            <ul className="space-y-1 text-sm">
              <li>• Book 1st/2nd class in advance online or at station</li>
              <li>• 3rd class is non-reserved (first-come)</li>
              <li>• Kandy-Ella route is most scenic - book early!</li>
              <li>• Arrive 30 mins before departure</li>
              <li>• Coastal line offers beautiful ocean views</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-bold">🚌 Buses</h3>
            <ul className="space-y-1 text-sm">
              <li>• AC buses are more comfortable for long trips</li>
              <li>• Regular buses are cheaper but slower</li>
              <li>• Highway buses are fastest for Colombo-Galle</li>
              <li>• Book luxury buses in advance</li>
              <li>• Normal buses run frequently - no booking needed</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Popular Routes */}
      <Card>
        <h2>🔥 Popular Routes</h2>
        <div className="grid gap-2">
          {[
            { from: "Colombo", to: "Kandy", type: "train" as TransportType },
            { from: "Kandy", to: "Ella", type: "train" as TransportType },
            { from: "Colombo", to: "Galle", type: "bus" as TransportType },
            { from: "Colombo", to: "Jaffna", type: "bus" as TransportType },
          ].map((quick, i) => (
            <button
              key={i}
              className="line cursor-pointer !border-b transition-all hover:bg-white/10"
              onClick={() => {
                setSearchFrom(quick.from);
                setSearchTo(quick.to);
                setTransportType(quick.type);
              }}
            >
              <span>
                <strong>{quick.from}</strong> → <strong>{quick.to}</strong>
              </span>
              <span>{quick.type === "train" ? "🚂" : "🚌"}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Railway Stations */}
      <Card>
        <h2>🚉 Major Railway Stations</h2>
        <p className="mb-3 text-sm opacity-75">
          {RAILWAY_STATIONS.length} railway stations across Sri Lanka
        </p>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {RAILWAY_STATIONS.slice(0, 12).map((station) => (
            <div key={station.code} className="rounded-lg bg-white/5 p-2">
              <div className="font-bold">{station.name}</div>
              <div className="text-xs opacity-75">
                {station.code} • {station.district}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
