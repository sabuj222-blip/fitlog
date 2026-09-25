import { Suspense } from "react";
import Image from "next/image";
import WorkoutGrid from "./components/WorkoutGrid";
import { Oswald } from "next/font/google";

// Oswald Font Initialize
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

// Server-Side Data Fetching (SSR)
async function getWorkouts() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

// Workout Grid Fetcher Component with Suspense support
async function WorkoutGridSection() {
  const workouts = await getWorkouts();
  return <WorkoutGrid initialWorkouts={workouts} />;
}

// Loading Skeleton / Spinner for Exercise Data
function ExercisesLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-[#ccff00] animate-spin"></div>
      <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest animate-pulse">
        Loading workouts...
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#0b0c10] text-white min-h-screen">
      {/* HERO BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-6">
        <div className="bg-[#12141c] border border-zinc-800/80 rounded-3xl p-8 md:p-12 lg:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[420px] relative overflow-hidden">

          {/* Left Text Content */}
          <div className="md:col-span-7 lg:col-span-8 z-10">
            {/* Tagline */}
            <p className="text-[#ccff00] font-bold tracking-widest text-[11px] uppercase font-mono mb-6">
              WORKOUT LIBRARY
            </p>

            {/* Heading: 3 lines for <= 420px, 2 lines for > 420px */}
            <h1 className={`${oswald.className} text-[26px] min-[421px]:text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] xl:text-[56px] text-white uppercase leading-[1.1] tracking-tight mb-6`}>
              {/* Line 1 */}
              <span className="block">
                TRAIN WITH <span className="hidden min-[421px]:inline">INTENT. LOG</span>
              </span>

              {/* Line 2 (Only visible <= 420px) */}
              <span className="block min-[421px]:hidden">
                INTENT. LOG
              </span>

              {/* Line 3 (<= 420px) / Line 2 (> 420px) */}
              <span className="block">
                EVERY SET.
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-mono">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br className="hidden sm:block" />
              into today's plan, and watch the week's work add up.
            </p>

            {/* Action Button */}
            <a
              href="#library"
              className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs font-mono px-6 py-3.5 rounded-lg transition-colors uppercase tracking-wider"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right Hero Image */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end items-center z-10">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[380px] h-[260px] sm:h-[280px] md:h-[320px] lg:h-[350px] flex items-center justify-center">
              <Image
                src="/hero-banner.png"
                alt="FitLog Hero Banner"
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* WORKOUT LIBRARY GRID WITH SUSPENSE LOADING */}
      <section id="library" className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <Suspense fallback={<ExercisesLoader />}>
          <WorkoutGridSection />
        </Suspense>
      </section>
    </div>
  );
}