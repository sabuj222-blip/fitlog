import Image from "next/image";
import WorkoutGrid from "./components/WorkoutGrid";

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
      <section className="max-w-7xl mx-auto px-8 pt-10 pb-6">
        <div className="bg-[#14161f] border border-zinc-800/60 rounded-3xl p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[420px] relative overflow-hidden">
          
          {/* Left Text Content */}
          <div className="md:col-span-7 z-10">
            <span className="text-[#ccff00] font-bold tracking-widest text-xs uppercase font-mono block mb-4">
              WORKOUT LIBRARY
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight font-mono leading-[1.1] text-white mb-6">
              TRAIN WITH INTENT. <br />
              LOG EVERY SET.
            </h1>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <a
              href="#library"
              className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs font-mono px-7 py-3.5 rounded-xl transition-colors uppercase tracking-wider"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right Hero Image */}
          <div className="md:col-span-5 flex justify-center md:justify-end items-center z-10">
            <div className="relative w-full max-w-[340px] md:max-w-[400px] h-[300px] md:h-[360px] flex items-center justify-center">
              <Image
                src="/hero-banner.png"
                alt="FitLog Hero Banner"
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* WORKOUT LIBRARY GRID */}
      <section id="library" className="max-w-7xl mx-auto px-8 py-8">
        <WorkoutGrid initialWorkouts={workouts} />
      </section>
    </div>
  );
}