"use client";
import { usePlan } from "../context/PlanContext";
import { Plus, Bookmark } from "lucide-react";

export default function DetailActions({ workout }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800">
      <button
        onClick={() => addToPlan(workout)}
        className="flex-1 bg-[#ccff00] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition text-sm font-mono uppercase"
      >
        <Plus className="w-4 h-4" /> Add to today's plan
      </button>
      <button
        onClick={() => addToSaved(workout)}
        className="flex-1 border border-zinc-700 hover:border-white text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition text-sm font-mono uppercase"
      >
        <Bookmark className="w-4 h-4" /> Save for later
      </button>
    </div>
  );
}