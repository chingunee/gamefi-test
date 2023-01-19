import React from "react";

export default function RoadmapCard({ title, step, desc }) {
  return (
    <div className="bg-[#0a1f2f] rounded md:p-8 p-4 md:space-y-6 space-y-3">
      <div className="flex items-center justify-between text-white font-semibold md:text-2xl">
        <h3>{title}</h3>
        <span className="text-[#28dbd1]">{step}</span>
      </div>
      <div className="text-white/80 md:text-lg text-sm font-medium">{desc}</div>
    </div>
  );
}
