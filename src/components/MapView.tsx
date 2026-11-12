"use client";
import { useEffect, useRef } from "react";
import { Circle, CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface Pin {
  id: string;
  lat: number;
  lon: number;
  label: string;
  color?: string;
  r?: number;
}

interface Props {
  pins: Pin[];
  line?: [number, number][];
  onPick?: (id: string) => void;
  center?: [number, number];
  zoom?: number;
  height?: number;
  me?: { lat: number; lon: number; acc: number } | null;
}

/** Real map with OpenStreetMap data - Shows actual roads, cities, landmarks */
export default function MapView({
  pins,
  line,
  onPick,
  center,
  zoom = 13,
  height = 320,
  me,
}: Props) {
  const mapRef = useRef<any>(null);

  // Validate coordinates
  const validCenter = center && 
    isFinite(center[0]) && 
    isFinite(center[1]) && 
    center[0] >= -90 && 
    center[0] <= 90 &&
    center[1] >= -180 && 
    center[1] <= 180
    ? center
    : undefined;

  const view = validCenter
    ? { center: validCenter, zoom }
    : {
        bounds: [
          [5.85, 79.6],
          [9.9, 82.05],
        ] as [[number, number], [number, number]],
      };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return (
    <MapContainer
      key={validCenter ? validCenter.join(",") : "island"}
      {...view}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height, width: "100%", borderRadius: "16px" }}
      ref={mapRef}
      whenReady={() => {
        // Map is ready
        if (mapRef.current) {
          setTimeout(() => {
            try {
              mapRef.current.invalidateSize();
            } catch (e) {
              // Ignore resize errors
            }
          }, 100);
        }
      }}
    >
      {/* Real OpenStreetMap tiles - Shows actual roads, cities, labels */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        minZoom={7}
      />
      
      {/* Zoom controls in bottom right */}
      <ZoomControl position="bottomright" />
      
      {/* Route line */}
      {line && line.length > 1 && (
        <Polyline
          positions={line}
          pathOptions={{ 
            color: "#f58220", 
            weight: 5,
            opacity: 0.8,
          }}
        />
      )}
      
      {/* Current location marker */}
      {me && isFinite(me.lat) && isFinite(me.lon) && (
        <>
          <Circle
            center={[me.lat, me.lon]}
            radius={me.acc}
            pathOptions={{
              color: "#2f80ed",
              weight: 2,
              fillColor: "#2f80ed",
              fillOpacity: 0.2,
            }}
          />
          <CircleMarker
            center={[me.lat, me.lon]}
            radius={10}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: "#2f80ed",
              fillOpacity: 1,
            }}
          >
            <Tooltip permanent={false} direction="top">
              📍 You are here
            </Tooltip>
          </CircleMarker>
        </>
      )}
      
      {/* Destination markers */}
      {pins
        .filter(p => isFinite(p.lat) && isFinite(p.lon))
        .map((p) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lon]}
            radius={p.r ?? 7}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: p.color ?? "#f58220",
              fillOpacity: 1,
            }}
            eventHandlers={{ click: () => onPick?.(p.id) }}
          >
            <Tooltip direction="top" offset={[0, -10]}>
              <strong>{p.label}</strong>
            </Tooltip>
          </CircleMarker>
        ))}
    </MapContainer>
  );
}
