import Image from "next/image";
import WorkoutGrid from "./components/WorkoutGrid";
import { Oswald } from "next/font/google";

// Oswald Font Initialize
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"], // Bold weight for heading
});

// Server-Side Data Fetching (SSR)
async function getWorkouts() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store", // Ensures fresh SSR on every request
  });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen">
      {/* HERO BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-6">
        <div className="bg-[#12141c] border border-zinc-800/80 rounded-3xl p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[420px] relative overflow-hidden">

          {/* Left Text Content */}
          <div className="md:col-span-8 z-10">
            {/* Tagline */}
            <p className="text-[#ccff00] font-bold tracking-widest text-[11px] uppercase font-mono mb-6">
              WORKOUT LIBRARY
            </p>

            {/* Main Heading - Exact Oswald Font & 60px */}
            <h1 className={`${oswald.className} text-[32px] sm:text-[46px] lg:text-[60px] text-white uppercase leading-[1.05] tracking-normal mb-6`}>
              <span className="block whitespace-nowrap">TRAIN WITH INTENT. LOG</span>
              <span className="block whitespace-nowrap">EVERY SET.</span>
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
          <div className="md:col-span-4 flex justify-center md:justify-end items-center z-10">
            <div className="relative w-full max-w-[320px] md:max-w-[380px] h-[280px] md:h-[350px] flex items-center justify-center">
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

      {/* WORKOUT LIBRARY GRID */}
      <section id="library" className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <WorkoutGrid initialWorkouts={workouts} />
      </section>
    </div>
  );
}