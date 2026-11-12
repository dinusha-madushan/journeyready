"use client";
import { useState } from "react";
import type { Province } from "@/lib/districts";
import Image from "next/image";

interface SriLankaMapProps {
  selectedProvince: Province | null;
  onProvinceSelect: (province: Province) => void;
}

export default function SriLankaMap({ selectedProvince, onProvinceSelect }: SriLankaMapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<Province | null>(null);

  return (
    <div className="relative w-full h-full">
      <div className="relative mx-auto max-w-2xl h-full flex flex-col">
        {/* PNG display - compact size */}
        <div className="flex-shrink-0">
          <img 
            src="/sri-lanka-provinces.png" 
            alt="Sri Lanka Provinces Map"
            className="w-full h-auto"
            style={{
              imageRendering: 'auto',
              maxWidth: '500px',
              maxHeight: '400px',
              margin: '0 auto',
              display: 'block',
              objectFit: 'contain'
            }}
          />
        </div>
        
        {/* Province selection cards - compact grid */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-2 flex-shrink-0">
          {[
            { name: "Northern", color: "bg-green-700" },
            { name: "North Central", color: "bg-green-300" },
            { name: "North Western", color: "bg-green-500" },
            { name: "Eastern", color: "bg-blue-400" },
            { name: "Central", color: "bg-green-200" },
            { name: "Western", color: "bg-green-700" },
            { name: "Sabaragamuwa", color: "bg-amber-200" },
            { name: "Uva", color: "bg-amber-300" },
            { name: "Southern", color: "bg-lime-300" }
          ].map((province) => (
            <button
              key={province.name}
              onClick={() => onProvinceSelect(province.name as Province)}
              onMouseEnter={() => setHoveredProvince(province.name as Province)}
              onMouseLeave={() => setHoveredProvince(null)}
              className={`
                p-2 rounded-lg border transition-all text-sm
                ${selectedProvince === province.name 
                  ? 'border-orange-500 bg-orange-500/20 scale-105' 
                  : 'border-white/20 bg-black/20 hover:border-orange-500/50 hover:bg-orange-500/10'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${province.color}`} />
                <span className="text-white font-medium text-xs lg:text-sm truncate">{province.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Hover Tooltip */}
      {hoveredProvince && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/90 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm shadow-xl border border-orange-500/30 z-50">
          <span className="text-orange-400">📍</span> {hoveredProvince} Province
          <div className="text-xs opacity-75 mt-0.5">Click to explore districts</div>
        </div>
      )}
    </div>
  );
}
