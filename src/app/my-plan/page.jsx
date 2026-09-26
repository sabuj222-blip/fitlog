"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/app/context/PlanContext";
import { Oswald } from "next/font/google";
import { Check, X, Clock, Flame, Star, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [completedIds, setCompletedIds] = useState([]);

  const currentList = activeTab === "plan" ? plan : saved;

  const parseNum = (val) => {
    if (typeof val === "number") return val;
    if (!val) return 0;
    const parsed = parseFloat(String(val).replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  };

  const getDuration = (item) => parseNum(item.duration || item.time || item.minutes || 0);
  const getCalories = (item) => {
    const cal = parseNum(item.calories || item.calorie || item.kcal);
    return cal > 0 ? cal : getDuration(item) * 8 || 100;
  };
  const getRating = (item) => parseNum(item.rating || 4.5);

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return getDuration(a) - getDuration(b);
    if (sortBy === "calories") return getCalories(b) - getCalories(a);
    if (sortBy === "rating") return getRating(b) - getRating(a);
    return 0;
  });

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, item) => acc + getDuration(item), 0);
  const totalCalories = currentList.reduce((acc, item) => acc + getCalories(item), 0);

  const handleRemove = (id) => {
    toast.dismiss();
    if (activeTab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    setCompletedIds((prev) => prev.filter((item) => item !== id));
    toast.success("Workout removed!", { position: "top-right" });
  };

  const handleToggleDone = (id) => {
    toast.dismiss();
    if (completedIds.includes(id)) {
      setCompletedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setCompletedIds((prev) => [...prev, id]);
      toast.success("Workout completed! 💪", { position: "top-right" });
    }
  };

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className={`${oswald.className} text-4xl font-extrabold uppercase tracking-tight text-white`}>
            MY PLAN
          </h1>
          <p className="text-zinc-500 text-xs mt-1 font-sans">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="bg-[#12141c] border border-zinc-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-zinc-500 text-xs font-medium mb-1 font-sans">Exercises</p>
            <p className={`${oswald.className} text-3xl sm:text-4xl font-bold text-[#ccff00]`}>
              {totalExercises}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium mb-1 font-sans">Minutes</p>
            <p className={`${oswald.className} text-3xl sm:text-4xl font-bold text-white`}>
              {totalMinutes}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-medium mb-1 font-sans">Calories</p>
            <p className={`${oswald.className} text-3xl sm:text-4xl font-bold text-white`}>
              {totalCalories}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="bg-[#12141c] p-1 rounded-xl border border-zinc-800/80 inline-flex gap-1 self-start">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "plan"
                  ? "bg-[#1d202c] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#1d202c] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-sans">
            <span>Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#12141c] border border-zinc-800/80 text-white rounded-xl pl-3 pr-8 py-2 outline-none focus:border-[#ccff00] cursor-pointer text-xs appearance-none font-mono"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="bg-[#12141c]/50 border border-dashed border-zinc-800/80 rounded-2xl py-20 text-center flex flex-col items-center justify-center p-6">
            <h2 className={`${oswald.className} text-xl font-bold uppercase tracking-wider text-white mb-1`}>
              NOTHING HERE YET
            </h2>
            <p className="text-zinc-500 text-xs mb-5 font-sans">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/#library"
              className={`${oswald.className} bg-[#ccff00] text-black text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#b8e600] transition-all`}
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {sortedList.map((item) => {
              const itemId = item.id || item._id || item.slug;
              const durationVal = getDuration(item);
              const caloriesVal = getCalories(item);
              const ratingVal = getRating(item);
              const cardImage = item.image || item.img || item.imageUrl || "/hero-banner.png";
              const isDone = completedIds.includes(itemId);

              return (
                <div
                  key={itemId}
                  className="bg-[#12141c] border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-28 h-20 bg-[#191c28] rounded-xl overflow-hidden shrink-0 border border-zinc-800/60">
                      <Image
                        src={cardImage}
                        alt={item.name || "Workout image"}
                        fill
                        sizes="120px"
                        className="object-cover"
                        unoptimized={typeof cardImage === "string" && cardImage.startsWith("http")}
                      />
                    </div>

                    <div>
                      <h3 className={`${oswald.className} text-base sm:text-lg font-bold uppercase tracking-tight text-white mb-0.5`}>
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-sans mb-2">
                        {item.equipment || "Bodyweight"}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-500" /> {durationVal} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-zinc-500" /> {caloriesVal} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-zinc-500" /> {ratingVal}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800/60">
                    <Link
                      href={`/workout/${itemId}`}
                      className="text-xs font-bold text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 px-3 py-2 rounded-xl transition font-sans"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => handleToggleDone(itemId)}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition font-sans cursor-pointer ${
                          isDone
                            ? "bg-transparent text-zinc-400 border border-zinc-800 hover:text-zinc-300"
                            : "bg-[#ccff00] hover:bg-[#b8e600] text-black"
                        }`}
                      >
                        <Check className={`w-3.5 h-3.5 ${isDone ? "text-zinc-400" : "text-black"}`} />
                        {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() => handleRemove(itemId)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition cursor-pointer"
                      aria-label="Remove"
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