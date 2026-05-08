"use client";

import { useEffect, useState } from "react";
import { issueStore, Issue } from "@/lib/issueStore";

export default function DashboardStats() {
  const [issues, setIssues] = useState<Issue[]>(issueStore.getAll());

  useEffect(() => {
    const handler = () => {
      setIssues([...issueStore.getAll()]);
    };

    window.addEventListener("issues-update", handler);
    return () => window.removeEventListener("issues-update", handler);
  }, []);

  const total = issues.length;

  const critical = issues.filter(
    (i) => i.severity === "Critical"
  ).length;

  const high = issues.filter(
    (i) => i.severity === "High"
  ).length;

  const avgConfidence =
    issues.reduce((acc, i) => acc + (i.confidence || 0), 0) /
    (issues.length || 1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

      <Card title="Total Issues" value={total} color="blue" />

      <Card title="Critical" value={critical} color="red" />

      <Card title="High Risk" value={high} color="orange" />

      <Card
        title="AI Confidence"
        value={`${avgConfidence.toFixed(1)}%`}
        color="green"
      />

    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: any;
  color: "red" | "blue" | "green" | "orange";
}) {
  const colors = {
    red: "text-red-400 bg-red-500/10 border-red-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    green: "text-green-400 bg-green-500/10 border-green-500/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <p className="text-xs text-gray-300">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}