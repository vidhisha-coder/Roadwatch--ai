

"use client";

import {
  AlertTriangle,
  Bell,
  MapPin,
  ShieldAlert,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import DashboardStats from "@/components/DashboardStats";
const LiveMap = dynamic(
  () => import("@/components/LiveMap"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 p-6 md:p-10">
        {/* NAVBAR */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              RoadWatch AI
            </h1>
            
            <p className="text-gray-400 mt-2 text-sm">
              Smart civic monitoring platform 🚧
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-white/5 border border-white/10 backdrop-blur-xl p-3 rounded-2xl hover:bg-white/10 transition">
              <Bell size={20} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20">
              RW
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-12 mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm">
              <ShieldAlert size={16} />
              AI Powered Road Intelligence
            </div>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Building
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Safer Roads
              </span>
              <br />
              Through AI
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Detect potholes, track dangerous roads, and empower citizens with
              real-time civic intelligence.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">
              <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-xl">
                Report Issue
              </button>

              <button className="bg-white/10 border border-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl hover:bg-white/20 transition duration-300">
                Explore Dashboard
              </button>
            </div>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <PremiumCard
            title="Total Reports"
            value="245"
            icon={<AlertTriangle className="text-red-400" />}
            glow="from-red-500/20 to-red-500/5"
          />

          <PremiumCard
            title="Issues Resolved"
            value="177"
            icon={<Wrench className="text-green-400" />}
            glow="from-green-500/20 to-green-500/5"
          />

          <PremiumCard
            title="Nearby Alerts"
            value="12"
            icon={<MapPin className="text-yellow-400" />}
            glow="from-yellow-500/20 to-yellow-500/5"
          />
        </div>

        {/* MAP + ALERTS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* MAP SECTION */}
          <div className="xl:col-span-2 rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl relative min-h-[420px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-25" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />

            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold">
                      Live Monitoring
                    </h2>
                    <p className="text-gray-400 mt-2">
                      AI-powered road condition analysis
                    </p>
                  </div>

                  <button className="bg-white/10 border border-white/10 p-3 rounded-2xl hover:bg-white/20 transition">
                    <ArrowUpRight />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-2xl backdrop-blur-xl">
                  🚨 8 Critical Zones
                </div>

                <div className="bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-2xl backdrop-blur-xl">
                  ✅ 21 Roads Repaired
                </div>
              </div>
            </div>
          </div>

          {/* ALERTS PANEL */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Recent Alerts</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Real-time issue reports
                </p>
              </div>

              <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
                <Bell className="text-red-400" size={18} />
              </div>
            </div>

            <div className="space-y-4">
              <AlertCard
                title="Severe Pothole Detected"
                location="Near City Mall Road"
                color="red"
              />

              <AlertCard
                title="Waterlogging Reported"
                location="Highway Junction"
                color="yellow"
              />

              <AlertCard
                title="Repair In Progress"
                location="Ring Road Sector 4"
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PremiumCard({
  title,
  value,
  icon,
  glow,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  glow: string;
}) {
  return (
    <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl rounded-[28px]">
      <div className={`absolute inset-0 bg-gradient-to-br ${glow}`} />

      <CardContent className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <h2 className="text-5xl font-bold mt-2">{value}</h2>
          </div>

          <div className="bg-white/10 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
            {icon}
          </div>
        </div>

        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="w-2/3 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function AlertCard({
  title,
  location,
  color,
}: {
  title: string;
  location: string;
  color: "red" | "yellow" | "blue";
}) {
  const styles = {
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      dot: "bg-red-400",
    },
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      dot: "bg-yellow-400",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      dot: "bg-blue-400",
    },
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className={`${styles[color].bg} ${styles[color].border}
      p-5 rounded-2xl backdrop-blur-xl cursor-pointer transition-all duration-300
      hover:shadow-xl hover:shadow-white/5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-2 h-2 rounded-full ${styles[color].dot} animate-pulse`}
            />

            <p className="text-xs uppercase tracking-widest text-gray-400">
              LIVE ALERT
            </p>
          </div>

          <h3 className="font-semibold text-lg">{title}</h3>

          <p className="text-gray-400 text-sm mt-1">{location}</p>
        </div>

        <ArrowUpRight className="text-gray-500" size={18} />
      </div>
    </motion.div>
  );
}

