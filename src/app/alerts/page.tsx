"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { issueStore, Issue } from "@/lib/issueStore";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Issue[]>([]);

  useEffect(() => {
    setAlerts(issueStore.getAll());

    const handler = () => {
      setAlerts([...issueStore.getAll()]);
    };

    window.addEventListener("issues-update", handler);
    return () => window.removeEventListener("issues-update", handler);
  }, []);

  const getBadge = (severity: Issue["severity"]) => {
    switch (severity) {
      case "Low":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "High":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Critical":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          🚨 Live Civic Alerts
        </h1>

        <p className="text-gray-400 mt-1">
          Real-time AI-powered road issue monitoring system
        </p>
      </div>

      {/* EMPTY STATE */}
      {alerts.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          No alerts yet. System is monitoring roads 👀
        </div>
      )}

      {/* ALERT LIST */}
      <div className="grid gap-4">

        <AnimatePresence>
          {alerts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-lg"
            >

              {/* TOP ROW */}
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-lg font-semibold">
                    {item.title}
                  </h2>

                  <p className="text-xs text-gray-400 mt-1">
                    📍 {item.location}
                  </p>
                </div>

                {/* SEVERITY BADGE */}
                <span
                  className={`px-3 py-1 rounded-full text-xs border ${getBadge(
                    item.severity
                  )}`}
                >
                  {item.severity}
                </span>

              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-300 mt-3">
                {item.description}
              </p>

              {/* CONFIDENCE BAR */}
              <div className="mt-4">

                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>AI Confidence</span>
                  <span>{item.confidence ?? 0}%</span>
                </div>

                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.confidence ?? 0}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-4">

                <button
                  className="text-xs text-blue-400 hover:underline"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("focus-map", {
                        detail: item,
                      })
                    );
                  }}
                >
                  📍 View on Map
                </button>

                <span className="text-xs text-gray-500">
                  ID: {item.id}
                </span>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>

      </div>
    </div>
  );
}