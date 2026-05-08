"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { alertStore } from "@/lib/alertStore";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LiveMap() {
  return (
    <div className="w-full h-[500px] rounded-[32px] overflow-hidden">

      <MapContainer
        center={[22.4707, 70.0577]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* MARKERS */}

        <Marker position={[22.4707, 70.0577]} icon={markerIcon}>
          <Popup>
            🚨 Severe pothole reported
          </Popup>
        </Marker>

        <Marker position={[22.4780, 70.0500]} icon={markerIcon}>
          <Popup>
            ⚠️ Waterlogging detected
          </Popup>
        </Marker>

        <Marker position={[22.4650, 70.0650]} icon={markerIcon}>
          <Popup>
            ✅ Road repair completed
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}