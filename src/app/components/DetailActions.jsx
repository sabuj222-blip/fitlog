"use client";

import { useEffect } from "react";
import { usePlan } from "../context/PlanContext";
import { Plus, Bookmark } from "lucide-react";
import { Oswald } from "next/font/google";
import toast from "react-hot-toast";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function DetailActions({ workout }) {
  const { plan, addToPlan, addToSaved } = usePlan();

  // Check if plan already has 5 lifts (the cap)
  const isCapReached = plan.length >= 5;

  // Check if this specific workout is already in the plan
  const getItemId = (item) => String(item?.id || item?._id || "").trim();
  const targetId = getItemId(workout);
  const isInPlan = plan.some((item) => getItemId(item) === targetId);

  useEffect(() => {
    toast.dismiss();
    toast("Viewing workout details!", {
      id: "workout-detail-toast",
      icon: "🏋️‍♂️",
      position: "top-right",
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Add to Today's Plan Button */}
        <button
          disabled={isCapReached || isInPlan}
          onClick={() => {
            toast.dismiss();
            addToPlan(workout);
          }}
          className={`${oswald.className} flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm uppercase tracking-wider ${
            isCapReached || isInPlan
              ? "bg-zinc-800 text-zinc-500 border border-zinc-700/60 cursor-not-allowed opacity-70"
              : "bg-[#ccff00] text-black font-bold hover:bg-opacity-90 cursor-pointer"
          }`}
        >
          <Plus className="w-4 h-4" /> Add to today's plan
        </button>

        {/* Save for Later Button */}
        <button
          onClick={() => {
            toast.dismiss();
            addToSaved(workout);
          }}
          className={`${oswald.className} flex-1 border border-zinc-700 hover:border-white text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm uppercase tracking-wider cursor-pointer`}
        >
          <Bookmark className="w-4 h-4" /> Save for later
        </button>
      </div>

      {/* Subtitle notice when 5-lift cap is reached */}
      {isCapReached && !isInPlan && (
        <p className="text-amber-400 text-xs font-mono text-center sm:text-left mt-1">
          ⚠️ Today's plan is full (5/5 lifts cap reached). Finish or remove a lift to add more.
        </p>
      )}
    </div>
  );
}