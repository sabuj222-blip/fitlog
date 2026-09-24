"use client";

import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutGrid({ initialWorkouts = [] }) {
  return (
    <>
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-zinc-900/80">
        <h2 className="text-3xl font-extrabold uppercase tracking-wider font-mono text-white">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialWorkouts.map((item) => (
          <Link
            key={item.id}
            href={`/workout/${item.id}`}
            className="bg-[#14161f] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#ccff00]/40 transition duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image Banner */}
              <div className="w-full h-52 relative bg-zinc-950 overflow-hidden">
                <img
                  src={item.image || "/hero-banner.png"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Badges - 2 Yellow Pills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {Array.isArray(item.category) && item.category.length >= 2 ? (
                    item.category.slice(0, 2).map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-[#ccff00] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono"
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="bg-[#ccff00] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        {item.category?.[0] || "CHEST"}
                      </span>
                      <span className="bg-[#ccff00] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        {item.category?.[1] || "ARMS"}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-extrabold text-xl text-white group-hover:text-[#ccff00] transition font-mono uppercase tracking-wide mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mb-4">
                  {item.equipment}
                </p>
              </div>
            </div>

            {/* Footer Metrics */}
            <div className="flex items-center gap-4 text-xs text-zinc-400 px-5 pb-5 pt-1 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-500" /> {item.duration} min
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-zinc-500" /> {item.calories} kcal
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-zinc-500" /> {item.rating}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}