"use client";

import { useState } from "react";
import { usePlan } from "../context/PlanContext";
import Link from "next/link";
import { ChevronDown, ArrowRight, Clock, Flame, Star, Check, X } from "lucide-react";

export default function MyPlanPage() {
  const { plan, saved, toggleDone, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState("plan"); // "plan" or "saved"
  const [sortBy, setSortBy] = useState("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  // Helper function to extract valid numeric values safely
  const getNumericValue = (val) => {
    if (!val) return 0;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const parsed = parseFloat(val.replace(/[^0-9.]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Dynamic Summary Calculations (Exercises, Minutes, Calories)
  const totalExercises = currentList.length;

  const totalMinutes = currentList.reduce((acc, item) => {
    return acc + getNumericValue(item.duration);
  }, 0);

  const totalCalories = currentList.reduce((acc, item) => {
    const calVal = getNumericValue(item.calories || item.calorie || item.kcal);
    if (calVal > 0) {
      return acc + calVal;
    }
    // Fallback: duration-er upor base kore calories count (8 kcal/min)
    const durationVal = getNumericValue(item.duration);
    return acc + durationVal * 8;
  }, 0);

  // Sorting logic
  const sortedList = [...currentList].sort((a, b) => {
    const durA = getNumericValue(a.duration);
    const durB = getNumericValue(b.duration);
    const calA = getNumericValue(a.calories) || durA * 8;
    const calB = getNumericValue(b.calories) || durB * 8;
    const rateA = getNumericValue(a.rating);
    const rateB = getNumericValue(b.rating);

    if (sortBy === "duration") return durA - durB;
    if (sortBy === "calories") return calB - calA;
    if (sortBy === "rating") return rateB - rateA;
    return 0;
  });

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen py-10 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Page Title */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white uppercase">
            MY PLAN
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Dynamic Summary Box (Exercises, Minutes, Calories) */}
        <div className="bg-[#12141c] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 grid grid-cols-3 gap-4 text-center sm:text-left">
          {/* Exercises */}
          <div className="border-r border-zinc-800/60 last:border-r-0 pr-4">
            <p className="text-xs font-mono text-zinc-400 font-medium tracking-wide">
              Exercises
            </p>
            <p className="text-3xl sm:text-5xl font-extrabold font-mono text-[#ccff00] mt-2">
              {totalExercises}
            </p>
          </div>

          {/* Minutes */}
          <div className="border-r border-zinc-800/60 last:border-r-0 px-2 sm:px-4">
            <p className="text-xs font-mono text-zinc-400 font-medium tracking-wide">
              Minutes
            </p>
            <p className="text-3xl sm:text-5xl font-extrabold font-mono text-white mt-2">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="pl-2 sm:pl-4">
            <p className="text-xs font-mono text-zinc-400 font-medium tracking-wide">
              Calories
            </p>
            <p className="text-3xl sm:text-5xl font-extrabold font-mono text-white mt-2">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex items-center justify-between pt-2 pb-2">
          {/* Left Side: Toggle Tabs */}
          <div className="flex items-center bg-[#12141c] p-1.5 rounded-xl border border-zinc-800/80">
            <button
              onClick={() => setActiveTab("plan")}
              className={`px-5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === "plan"
                  ? "bg-[#1c202c] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#1c202c] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Right Side: Sort By */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-zinc-400">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#12141c] border border-zinc-800/80 text-white pl-4 pr-10 py-2 rounded-xl text-xs focus:outline-none focus:border-[#ccff00] cursor-pointer"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* List Section */}
        {sortedList.length === 0 ? (
          <div className="bg-[#14161f] border border-zinc-800/60 rounded-2xl p-12 text-center my-6">
            <p className="text-zinc-400 text-sm font-mono mb-4">
              {activeTab === "plan"
                ? "No workouts added to Today's Plan yet."
                : "No workouts saved for later."}
            </p>
            {activeTab === "plan" && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#ccff00] text-black text-xs font-mono font-extrabold px-5 py-2.5 rounded-lg uppercase"
              >
                Browse Workouts <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedList.map((item) => {
              const itemId = item.id || item._id;
              const itemCal =
                getNumericValue(item.calories) || getNumericValue(item.duration) * 8;

              return (
                <div
                  key={itemId}
                  className="bg-[#12141c] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-200 hover:border-zinc-700"
                >
                  {/* Left Side: Image + Info */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-zinc-950 flex-shrink-0">
                      <img
                        src={item.image || "/hero-banner.png"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-white font-mono uppercase tracking-wide">
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5 mb-2">
                        {item.equipment || "Bodyweight"}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" />{" "}
                          {getNumericValue(item.duration)} min
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-zinc-500" /> {itemCal} kcal
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 text-zinc-500" />{" "}
                          {item.rating || "4.5"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Action Buttons */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-zinc-800/60 pt-3 sm:pt-0">
                    <Link
                      href={`/workout/${itemId}`}
                      className="px-4 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-700 bg-[#171923] text-zinc-300 hover:text-white text-xs font-mono font-medium transition"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => toggleDone(itemId)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono font-bold transition cursor-pointer ${
                          item.done
                            ? "bg-zinc-800 text-zinc-400 border border-zinc-700"
                            : "bg-[#ccff00] hover:bg-[#b8e600] text-black"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {item.done ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    {/* Remove Cross Button */}
                    <button
                      onClick={() => {
                        if (activeTab === "plan") {
                          removeFromPlan(itemId);
                        } else {
                          removeFromSaved(itemId);
                        }
                      }}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer ml-1"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}