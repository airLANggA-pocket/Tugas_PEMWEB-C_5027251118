// src/components/molecules/StatCard.jsx
// Kartu statistik untuk halaman Dashboard (Atomic Design - Molecule)

import React from "react";
import Card from "../atoms/Card";

export default function StatCard({ title, value, subtitle, icon, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <Card className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
          {title}
        </p>
        <p className="text-2xl font-extrabold text-slate-800">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {icon && (
        <div
          className={`p-3 rounded-lg border ${colorMap[color] || colorMap.blue} text-xl flex items-center justify-center`}
        >
          {icon}
        </div>
      )}
    </Card>
  );
}
