"use client";

import { usePlan } from "../context/PlanContext";
import { Plus, Bookmark } from "lucide-react";
import { Oswald } from "next/font/google";
import toast from "react-hot-toast";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function DetailActions({ workout }) {
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const getItemId = (item) => String(item?.id || item?._id || "").trim();
  const targetId = getItemId(workout);

  const isCapReached = plan.length >= 5;
  const isInPlan = plan.some((item) => getItemId(item) === targetId);
  const isInSaved = saved?.some((item) => getItemId(item) === targetId);

  const handleAddToPlan = () => {
    toast.dismiss();
    if (isInPlan) {
      toast("Already in today's plan!", { icon: "ℹ️", position: "top-right" });
      return;
    }
    if (isCapReached) {
      toast.error("Plan is full (5/5 limit reached)!", { position: "top-right" });
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan!", { position: "top-right" });
  };

  const handleSaveForLater = () => {
    toast.dismiss();
    if (isInSaved) {
      toast("Already saved!", { icon: "ℹ️", position: "top-right" });
      return;
    }
    addToSaved(workout);
    toast.success("Saved for later!", { position: "top-right" });
  };

  return (
    <div className="flex flex-col gap-2 pt-3 border-t border-zinc-800/80">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          disabled={isCapReached || isInPlan}
          onClick={handleAddToPlan}
          className={`${oswald.className} flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm uppercase tracking-wider ${
            isInPlan || isCapReached
              ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed font-medium"
              : "bg-[#ccff00] text-black font-bold hover:bg-[#b8e600] cursor-pointer"
          }`}
        >
          <Plus className="w-4 h-4" /> Add to today's plan
        </button>

        <button
          onClick={handleSaveForLater}
          className={`${oswald.className} flex-1 border border-zinc-700 hover:border-zinc-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm uppercase tracking-wider cursor-pointer ${
            isInSaved ? "bg-zinc-800/80 text-zinc-300" : ""
          }`}
        >
          <Bookmark className="w-4 h-4" /> Save for later
        </button>
      </div>

      {isCapReached && !isInPlan && (
        <p className="text-amber-400 text-[11px] font-mono text-center sm:text-left mt-1">
          ⚠️ Today's plan is full (5/5 lifts limit reached).
        </p>
      )}
    </div>
  );
}