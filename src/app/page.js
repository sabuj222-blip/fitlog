import Image from "next/image";
import Link from "next/link";
import WorkoutGrid from "./components/WorkoutGrid";
import { ArrowRight } from "lucide-react";

// Server-Side Data Fetching (SSR)
async function getWorkouts() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store", // Ensures fresh Server-Side Rendering
  });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen">
      {/* HERO SECTION - SSR */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[#ccff00] font-bold tracking-widest text-sm uppercase font-mono">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight my-4 font-mono leading-tight">
            TRAIN WITH INTENT. <br />
            LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3.5 rounded-lg hover:bg-opacity-90 transition font-mono"
          >
            BROWSE WORKOUTS <ArrowRight className="w-5 h-5" />
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/hero-banner.png"
            alt="FitLog Hero Banner"
            width={450}
            height={450}
            className="object-contain drop-shadow-[0_10px_20px_rgba(204,255,0,0.15)]"
            priority
          />
        </div>
      </section>

      {/* LIBRARY GRID SECTION */}
      <section id="library" className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-900">
        <WorkoutGrid initialWorkouts={workouts} />
      </section>
    </div>
  );
}