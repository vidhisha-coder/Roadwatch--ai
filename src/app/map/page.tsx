"use client";

import { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { issueStore, Issue } from "@/lib/issueStore";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 22.4707,
  lng: 70.0577,
};

export default function MapPage() {
  const [issues, setIssues] = useState<Issue[]>(issueStore.getAll());
  const [selected, setSelected] = useState<Issue | null>(null);

  // ✅ SIMPLE JS MAP REF (NO TYPES = NO ERRORS)
  const mapRef = useRef<any>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyARWDVNjqS4025Uxl2JuXP3JQutLZ7WTt0",
  });

  // 🔄 sync with reports
  useEffect(() => {
    const handler = () => {
      setIssues([...issueStore.getAll()]);
    };

    window.addEventListener("issues-update", handler);
    return () => window.removeEventListener("issues-update", handler);
  }, []);

  // 🔄 sync with alerts
  useEffect(() => {
    const handler = (e: any) => {
      const issue = e.detail;
      if (!issue) return;

      setSelected(issue);

      // SAFE MAP CONTROL
      if (mapRef.current) {
        mapRef.current.panTo({
          lat: issue.lat,
          lng: issue.lng,
        });
        mapRef.current.setZoom(16);
      }
    };

    window.addEventListener("focus-map", handler);
    return () => window.removeEventListener("focus-map", handler);
  }, []);

  const getColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "green";
      case "Medium":
        return "yellow";
      case "High":
        return "orange";
      case "Critical":
        return "red";
      default:
        return "blue";
    }
  };

  if (!isLoaded) {
    return (
      <div className="text-white p-5">
        Loading Google Map...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-5">

      <h1 className="text-2xl font-bold mb-4">🗺️ Live Map</h1>

      {/* MAP */}
      <div className="rounded-xl overflow-hidden border border-white/10">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {issues.map((issue) => (
            <Marker
              key={issue.id}
              position={{
                lat: issue.lat,
                lng: issue.lng,
              }}
              onClick={() => {
                setSelected(issue);

                if (mapRef.current) {
                  mapRef.current.panTo({
                    lat: issue.lat,
                    lng: issue.lng,
                  });
                  mapRef.current.setZoom(16);
                }
              }}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${getColor(
                  issue.severity
                )}-dot.png`,
              }}
            />
          ))}
        </GoogleMap>
      </div>

      {/* LIST */}
      <div className="mt-5 space-y-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="p-3 bg-[#111] rounded-lg border border-white/10 cursor-pointer"
            onClick={() => {
              setSelected(issue);

              if (mapRef.current) {
                mapRef.current.panTo({
                  lat: issue.lat,
                  lng: issue.lng,
                });
                mapRef.current.setZoom(16);
              }
            }}
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{issue.title}</h3>
              <span className="text-xs text-gray-400">
                {issue.severity}
              </span>
            </div>
            <p className="text-xs text-gray-400">{issue.location}</p>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selected && (
        <div className="fixed bottom-5 left-5 right-5 bg-[#111] border border-white/20 p-4 rounded-xl">
          <h2 className="font-bold">{selected.title}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {selected.description}
          </p>

          <button
            className="mt-3 text-blue-400 text-sm"
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}