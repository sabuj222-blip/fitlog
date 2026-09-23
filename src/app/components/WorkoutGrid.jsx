"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, Clock, Flame, Star } from "lucide-react";

export default function WorkoutGrid({ initialWorkouts }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("duration");

  const filteredWorkouts = initialWorkouts.filter((w) => {
    const nameMatch = w.name?.toLowerCase().includes(search.toLowerCase());
    const tagMatch = w.category?.some((cat) =>
      cat.toLowerCase().includes(search.toLowerCase())
    );
    return nameMatch || tagMatch;
  });

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.calories - a.calories;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <>
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-zinc-900/80">
        <div>
          <h2 className="text-3xl font-extrabold uppercase tracking-wider font-mono text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search name or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#14161f] border border-zinc-800 text-white pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#14161f] border border-zinc-800 text-white pl-4 pr-10 py-2 rounded-lg text-sm focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">Sort By: Duration</option>
              <option value="calories">Sort By: Calories</option>
              <option value="rating">Sort By: Rating</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWorkouts.map((item) => (
          <Link
            key={item.id}
            href={`/workout/${item.id}`}
            className="bg-[#14161f] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#ccff00]/40 transition duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Card Image Banner */}
              <div className="w-full h-52 relative bg-zinc-950 overflow-hidden">
                <img
                  src={item.image || "/hero-banner.png"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Strictly Always 2 Yellow Category Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {Array.isArray(item.category) && item.category.length >= 2 ? (
                    item.category.slice(0, 2).map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-[#ccff00] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="bg-[#ccff00] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {item.category?.[0] || "CHEST"}
                      </span>
                      <span className="bg-[#ccff00] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {item.category?.[1] || "ARMS"}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-xl text-white group-hover:text-[#ccff00] transition font-mono uppercase tracking-wide mb-1">
                  {item.name}
                </h3>
                {/* Subtitle / Equipment */}
                <p className="text-xs text-zinc-400 font-mono mb-4">
                  {item.equipment}
                </p>
              </div>
            </div>

            {/* Card Footer Metrics */}
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