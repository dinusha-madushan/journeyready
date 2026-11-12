"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  DISTRICTS, 
  PLACES, 
  getAllProvinces, 
  getDistrictsByProvince, 
  getPlacesByDistrict,
  type Province 
} from "@/lib/districts";
import { Card } from "@/components/ui";
import TravelMap from "@/components/TravelMap";
import SriLankaMap from "@/components/SriLankaMap";

export default function ExploreNew() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const provinces = getAllProvinces();
  const districts = selectedProvince ? getDistrictsByProvince(selectedProvince) : [];
  const places = selectedDistrict ? getPlacesByDistrict(selectedDistrict) : [];

  // Filter places by search and category
  const filteredPlaces = places.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Navigation
  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const handleDistrictSelect = (districtId: string) => {
    setSelectedDistrict(districtId);
  };

  const currentDistrict = selectedDistrict 
    ? DISTRICTS.find(d => d.id === selectedDistrict) 
    : null;

  return (
    <div className="grid gap-5">
      {/* Header & Breadcrumb */}
      <Card>
        <h1>🌍 Explore Sri Lanka</h1>
        <p className="mb-4">Discover destinations organized by province and district</p>
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button 
            onClick={() => {
              setSelectedProvince(null);
              setSelectedDistrict(null);
            }}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
              !selectedProvince && !selectedDistrict
                ? "bg-orange-500/20 text-orange-500" 
                : "hover:bg-white/10"
            }`}
          >
            🗺️ Sri Lanka Map
          </button>
          
          {selectedProvince && (
            <>
              <span className="opacity-50">›</span>
              <button 
                onClick={() => {
                  setSelectedDistrict(null);
                }}
                className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                  selectedProvince && !selectedDistrict
                    ? "bg-orange-500/20 text-orange-500" 
                    : "hover:bg-white/10"
                }`}
              >
                {selectedProvince}
              </button>
            </>
          )}
          
          {currentDistrict && (
            <>
              <span className="opacity-50">›</span>
              <span className="rounded-lg bg-orange-500/20 px-3 py-1.5 font-medium text-orange-500">
                {currentDistrict.icon} {currentDistrict.name}
              </span>
            </>
          )}
        </div>

        {/* Search & Filters (in places view) */}
        {selectedDistrict && (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input
              type="search"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="inp"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="inp"
            >
              <option value="all">All Categories</option>
              <option value="Beach">Beach</option>
              <option value="Hills">Hills</option>
              <option value="History">History</option>
              <option value="Wildlife">Wildlife</option>
              <option value="City">City</option>
              <option value="Cultural">Cultural</option>
            </select>
          </div>
        )}
      </Card>

      {/* MAIN LAYOUT: MAP + SIDE PANEL */}
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        
        {/* LEFT: SRI LANKA MAP (Always Visible) */}
        <Card className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3">
            <h2 className="mb-2">Interactive Map of Sri Lanka</h2>
            <p className="text-sm opacity-75">
              {!selectedProvince && "Click a province to explore districts"}
              {selectedProvince && !selectedDistrict && `${selectedProvince} Province - Select a district`}
              {selectedDistrict && `${currentDistrict?.name} District`}
            </p>
          </div>
          <SriLankaMap 
            selectedProvince={selectedProvince}
            onProvinceSelect={handleProvinceSelect}
          />
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="text-xs opacity-75">
              {selectedProvince ? (
                <button onClick={goToMap} className="text-orange-500 hover:underline">
                  ← Back to All Provinces
                </button>
              ) : (
                "9 Provinces • 25 Districts • 139+ Places"
              )}
            </div>
          </div>
        </Card>

        {/* RIGHT: CONTENT PANEL */}
        <div className="grid gap-4">
          
          {/* NO SELECTION - Empty state with instruction */}
          {!selectedProvince && (
            <Card className="flex items-center justify-center min-h-[400px] text-center">
              <div>
                <div className="text-6xl mb-4">👈</div>
                <h2 className="text-2xl font-bold mb-2">Select a Province</h2>
                <p className="text-sm opacity-75 max-w-sm mx-auto">
                  Click any province button on the map to explore its districts and travel destinations
                </p>
              </div>
            </Card>
          )}

          {/* PROVINCE SELECTED - Show Districts */}
          {selectedProvince && !selectedDistrict && (
            <>
              <Card>
                <h2 className="mb-2">{selectedProvince} Province - Districts</h2>
                <p className="text-sm opacity-75">{districts.length} districts in this province</p>
              </Card>
              
              {districts.map((district) => {
                const placeCount = getPlacesByDistrict(district.id).length;
                return (
                  <Card 
                    key={district.id}
                    className="cursor-pointer overflow-hidden !p-0 transition-all hover:scale-[1.02] hover:shadow-xl"
                    onClick={() => handleDistrictSelect(district.id)}
                  >
                    {/* District Image */}
                    {district.image && (
                      <div 
                        className="relative h-32 bg-cover bg-center"
                        style={{ backgroundImage: `url(${district.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        <div className="absolute bottom-2 left-3 text-4xl">
                          {district.icon}
                        </div>
                      </div>
                    )}
                    
                    {/* District Info */}
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-bold">{district.name}</h3>
                      <p className="mb-3 text-sm">{district.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="opacity-75">
                          {placeCount} place{placeCount !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xl text-orange-500">→</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </>
          )}

          {/* DISTRICT SELECTED - Show Places */}
          {selectedDistrict && (
            <>
              {/* Places Summary Card */}
              <Card>
                <h2 className="mb-2">{currentDistrict?.name} - Travel Places</h2>
                <p className="text-sm opacity-75 mb-3">
                  {filteredPlaces.length} destination{filteredPlaces.length !== 1 ? "s" : ""} found
                </p>
              </Card>

              {/* Places List */}
              {filteredPlaces.length === 0 ? (
                <Card className="text-center">
                  <p className="text-lg opacity-75">
                    {searchQuery || selectedCategory !== "all"
                      ? `No places found matching your search`
                      : "No places added for this district yet"}
                  </p>
                </Card>
              ) : (
                filteredPlaces.map((place) => (
                  <Card key={place.id} className="overflow-hidden !p-0">
                    {/* Place Image */}
                    {place.images && place.images.length > 0 && (
                      <div 
                        className="relative h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${place.images[0]})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                        
                        {/* Category Badge */}
                        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {place.category}
                        </span>
                        
                        {/* Icon */}
                        <div className="absolute bottom-3 left-3 text-5xl drop-shadow-lg">
                          {place.icon}
                        </div>
                      </div>
                    )}
                    
                    {/* Place Info */}
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-bold">{place.name}</h3>
                      <p className="mb-3 text-sm">{place.description}</p>
                      
                      {/* Quick Info Grid */}
                      <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-white/5 p-2">
                          <div className="opacity-75">Best Time</div>
                          <div className="font-semibold">{place.bestTime}</div>
                        </div>
                        <div className="rounded-lg bg-white/5 p-2">
                          <div className="opacity-75">Duration</div>
                          <div className="font-semibold">{place.duration}</div>
                        </div>
                      </div>
                      
                      {place.entryFee && (
                        <p className="mb-3 text-sm">
                          💵 <strong>Entry:</strong> {place.entryFee}
                        </p>
                      )}
                      
                      {/* Highlights */}
                      {place.highlights && place.highlights.length > 0 && (
                        <div className="mb-3">
                          <p className="mb-1 text-sm font-semibold">Highlights:</p>
                          <ul className="space-y-1 text-xs opacity-75">
                            {place.highlights.slice(0, 3).map((h, i) => (
                              <li key={i}>• {h}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="row">
                        <Link 
                          href={`/routes?destination=${place.name}`}
                          className="btn btn-p flex-1"
                        >
                          🗺️ Get Route
                        </Link>
                        <button className="btn">
                          ⭐ Save
                        </button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
