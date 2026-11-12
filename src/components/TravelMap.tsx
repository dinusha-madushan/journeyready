"use client";
import dynamic from "next/dynamic";

const TravelMap = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: 320, width: "100%" }}
      className="grid place-items-center rounded-2xl bg-gray-100/10"
    >
      <span className="text-sm opacity-70">Loading map...</span>
    </div>
  ),
});

export default TravelMap;
