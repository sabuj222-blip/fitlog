"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailActions from "../../components/DetailActions";
import { Oswald } from "next/font/google";

// Oswald Font Config
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safe helper to extract numeric values
  const getNum = (val) => {
    if (!val) return 0;
    if (typeof val === "number") return val;
    const parsed = parseFloat(String(val).replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    if (!id) return;

    async function fetchWorkout() {
      try {
        setLoading(true);
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const workouts = await res.json();

        if (Array.isArray(workouts)) {
          const targetId = String(id).trim().toLowerCase();

          // Match by id or slug
          const found = workouts.find((w) => {
            const wId = String(w.id || "").trim().toLowerCase();
            const wSlug = String(w.slug || "").trim().toLowerCase();
            return wId === targetId || wSlug === targetId;
          });

          setWorkout(found || null);
        }
      } catch (err) {
        console.error("Error fetching detail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#0b0c10] text-white flex flex-col items-center justify-center font-mono">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-400 text-sm">Loading Workout Details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] bg-[#0b0c10] text-white flex flex-col items-center justify-center font-mono gap-3">
        <p className={`${oswald.className} text-red-400 text-xl font-bold uppercase tracking-wide`}>
          Workout not found!
        </p>
        <p className="text-zinc-500 text-xs">Requested ID: {id || "None"}</p>
      </div>
    );
  }

  // Dynamic Calories calculation
  const durationVal = getNum(workout.duration);
  const caloriesVal =
    getNum(workout.calories || workout.calorie || workout.kcal) ||
    (durationVal ? durationVal * 8 : 150);

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen py-10 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Dynamic Image */}
        <div className="md:col-span-6 w-full aspect-square relative bg-[#14161f] rounded-3xl overflow-hidden border border-zinc-800/60 shadow-2xl">
          <img
            src={workout.image || "/hero-banner.png"}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dynamic Content */}
        <div className="md:col-span-6 flex flex-col justify-between h-full pt-2">
          <div>
            {/* Workout Title with Oswald */}
            <h1 className={`${oswald.className} text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-3`}>
              {workout.name}
            </h1>

            <p className="text-zinc-400 text-sm leading-relaxed mb-5 font-sans">
              {workout.description || "A targeted exercise to build strength and endurance."}
            </p>

            {/* Dynamic Badges with Oswald */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Array.isArray(workout.category) && workout.category.length > 0 ? (
                workout.category.slice(0, 2).map((cat, idx) => (
                  <span
                    key={idx}
                    className={`${oswald.className} bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
                  >
                    {cat}
                  </span>
                ))
              ) : (
                <>
                  <span className={`${oswald.className} bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                    CHEST
                  </span>
                  <span className={`${oswald.className} bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                    ARMS
                  </span>
                </>
              )}
            </div>

            {/* Dynamic Specs Table with Oswald Labels */}
            <div className="bg-[#12141c] border border-zinc-800/80 rounded-2xl p-5 mb-6 text-xs space-y-3.5">
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold text-sm`}>EQUIPMENT</span>
                <span className="font-semibold text-zinc-200 font-mono">{workout.equipment || "Bodyweight"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold text-sm`}>DIFFICULTY</span>
                <span className="font-semibold text-zinc-200 font-mono">{workout.difficulty || "Intermediate"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold text-sm`}>SETS</span>
                <span className="font-semibold text-zinc-200 font-mono">{workout.sets || "4"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold text-sm`}>REPS</span>
                <span className="font-semibold text-zinc-200 font-mono">{workout.reps || "8-12"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold text-sm`}>DURATION</span>
                <span className="font-semibold text-zinc-200 font-mono">{durationVal} min</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold text-sm`}>CALORIES</span>
                <span className="font-semibold text-zinc-200 font-mono">{caloriesVal} kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold text-sm`}>RATING</span>
                <span className="font-semibold text-zinc-200 font-mono">{workout.rating || "4.5"}</span>
              </div>
            </div>

            {/* Dynamic Instructions with Oswald Header */}
            <div className="mb-8">
              <h3 className={`${oswald.className} font-bold text-sm uppercase text-zinc-200 mb-3 tracking-widest`}>
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2 text-xs text-zinc-400 font-sans">
                {Array.isArray(workout.instructions) && workout.instructions.length > 0 ? (
                  workout.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-zinc-500">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-500">No instructions available for this workout.</li>
                )}
              </ol>
            </div>
          </div>

          {/* Action Buttons */}
          <DetailActions workout={{ ...workout, calories: caloriesVal }} />
        </div>

      </div>
    </div>
  );
}