"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "../context/PlanContext";
import { Check, X, Eye, Dumbbell, Clock, Flame } from "lucide-react";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("plan");
  const { plan, saved, toggleDone, removeFromPlan, removeFromSaved } = usePlan();

  const currentList = activeTab === "plan" ? plan : saved;

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = plan.reduce((acc, curr) => acc + (Number(curr.calories) || 0), 0);

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold uppercase tracking-wide font-mono">MY PLAN</h1>
        <p className="text-zinc-400 text-sm mt-1 mb-8">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-center gap-4">
            <div className="bg-zinc-800 p-3 rounded-lg text-[#ccff00]">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase font-medium font-mono">Exercises</p>
              <h3 className="text-2xl font-extrabold font-mono">{totalExercises} / 5</h3>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-center gap-4">
            <div className="bg-zinc-800 p-3 rounded-lg text-[#ccff00]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase font-medium font-mono">Minutes</p>
              <h3 className="text-2xl font-extrabold font-mono">{totalMinutes} min</h3>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-center gap-4">
            <div className="bg-zinc-800 p-3 rounded-lg text-[#ccff00]">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase font-medium font-mono">Calories</p>
              <h3 className="text-2xl font-extrabold font-mono">{totalCalories} kcal</h3>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-800 mb-6">
          <button
            onClick={() => setActiveTab("plan")}
            className={`pb-3 px-6 font-bold text-sm transition uppercase font-mono ${
              activeTab === "plan"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Today's Plan ({plan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 px-6 font-bold text-sm transition uppercase font-mono ${
              activeTab === "saved"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* List Content */}
        {currentList.length === 0 ? (
          <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl p-12 text-center my-8">
            <h3 className="text-xl font-extrabold uppercase text-zinc-300 font-mono">
              NOTHING HERE YET
            </h3>
            <p className="text-zinc-500 text-sm mt-1 mb-6">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-lg text-sm font-mono uppercase"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((item) => (
              <div
                key={item.id}
                className={`bg-zinc-900 border ${
                  item.done ? "border-emerald-500/40 opacity-70" : "border-zinc-800"
                } p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-16 h-16 relative bg-zinc-950 rounded-lg flex-shrink-0 p-2">
                    <Image
                      src={item.image || "/hero-banner.png"}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4
                      className={`font-bold text-base ${
                        item.done ? "line-through text-zinc-400" : "text-white"
                      }`}
                    >
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400">{item.equipment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <span className="text-xs text-zinc-400 font-mono">
                    {item.duration} min | {item.calories} kcal
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/workout/${item.id}`}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => toggleDone(item.id)}
                        className={`p-2 rounded-lg transition ${
                          item.done
                            ? "bg-emerald-500 text-black"
                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        }`}
                        title="Mark as Done"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id)
                      }
                      className="p-2 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}