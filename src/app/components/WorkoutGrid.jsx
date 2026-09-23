"use client";
import { useState } from "react";
import Image from "next/image";
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-zinc-900">
        <div>
          <h2 className="text-3xl font-extrabold uppercase tracking-wider font-mono">
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
              className="bg-zinc-900 border border-zinc-800 text-white pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-zinc-900 border border-zinc-800 text-white pl-4 pr-10 py-2 rounded-lg text-sm focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">Sort By: Duration</option>
              <option value="calories">Sort By: Calories</option>
              <option value="rating">Sort By: Rating</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWorkouts.map((item) => (
          <Link
            key={item.id}
            href={`/workout/${item.id}`}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 hover:border-[#ccff00]/50 transition flex flex-col justify-between group"
          >
            <div>
              <div className="w-full h-48 relative mb-4 rounded-lg bg-zinc-950 overflow-hidden flex items-center justify-center">
                <Image
                  src={item.image || "/hero-banner.png"}
                  alt={item.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {item.category?.map((cat, idx) => (
                  <span
                    key={idx}
                    className="bg-zinc-800 text-[#ccff00] text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h3 className="font-bold text-lg text-white group-hover:text-[#ccff00] transition mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-zinc-400 mb-4">{item.equipment}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800 pt-3 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" /> {item.duration} min
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> {item.calories} kcal
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {item.rating}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}