"use client";

import { usePlan } from "../context/PlanContext";
import { Plus, Bookmark } from "lucide-react";
import { Oswald } from "next/font/google";

// Oswald Font Config
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function DetailActions({ workout }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800">
      <button
        onClick={() => addToPlan(workout)}
        className={`${oswald.className} flex-1 bg-[#ccff00] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition text-sm uppercase tracking-wider cursor-pointer`}
      >
        <Plus className="w-4 h-4" /> Add to today's plan
      </button>

      <button
        onClick={() => addToSaved(workout)}
        className={`${oswald.className} flex-1 border border-zinc-700 hover:border-white text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm uppercase tracking-wider cursor-pointer`}
      >
        <Bookmark className="w-4 h-4" /> Save for later
      </button>
    </div>
  );
}