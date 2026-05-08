"use client";

import React, { useState } from "react";
import { issueStore } from "@/lib/issueStore";
import { predictSeverity } from "@/lib/aiEngine";

import {
  Camera,
  MapPin,
  ShieldAlert,
  Upload,
  ArrowLeft,
} from "lucide-react";

import { motion } from "framer-motion";
import BottomNav from "@/components/ui/BottomNav";

export default function ReportPage() {
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = () => {
    const title = "Pothole detected";
    const description = "AI detected road damage";
    console.log("SUBMIT CLICKED");
console.log(issueStore.getAll());
    const severity = predictSeverity(title + " " + description);

    const newIssue = {
      id: Date.now(),
      title,
      location: "City Center",
      lat: 22.4707,
      lng: 70.0577,
      severity,
      confidence: 92,
      description,
    };

    // ✅ ADD TO STORE
    issueStore.add(newIssue);

    // 🔥 IMPORTANT: NOTIFY ALL PAGES
    window.dispatchEvent(new Event("issues-update"));
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-hidden relative">

      <div className="relative z-10 p-6 max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Report Road Issue
        </h1>

        {/* UPLOAD BOX */}
        <div
          onClick={() => setUploaded(true)}
          className="border border-white/10 p-10 rounded-xl bg-white/5 cursor-pointer"
        >
          {!uploaded ? (
            <p className="text-gray-400">
              Click to upload image
            </p>
          ) : (
            <p className="text-green-400">
              Image uploaded ✔
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 py-3 rounded-xl font-bold"
        >
          Submit Report 🚀
        </button>

      </div>

      <BottomNav />
    </main>
  );
}