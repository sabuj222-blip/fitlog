"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";
import { Oswald } from "next/font/google";

// Oswald Font Config
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="bg-[#0b0c10] border-b border-zinc-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        
        {/* Logo with Oswald */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className={`${oswald.className} font-bold tracking-wider text-2xl text-white uppercase`}>
            FITLOG
          </span>
        </Link>

        {/* Middle Nav Links with Oswald */}
        <nav className="flex items-center gap-1.5 bg-[#12141a] p-1.5 rounded-full border border-zinc-800/60">
          <Link
            href="/"
            className={`${oswald.className} px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              isWorkoutsActive
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`${oswald.className} px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              isMyPlanActive
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Badges with Oswald */}
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/my-plan"
            className="flex items-center gap-2.5 bg-[#12141a] border border-zinc-800/80 hover:border-zinc-700 px-4 py-2 rounded-full transition"
          >
            <span className={`${oswald.className} text-zinc-400 font-semibold uppercase tracking-wider`}>Plan</span>
            <span className="bg-[#ccff00] text-black font-extrabold w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono">
              {plan?.length || 0}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2.5 bg-[#12141a] border border-zinc-800/80 hover:border-zinc-700 px-4 py-2 rounded-full transition"
          >
            <span className={`${oswald.className} text-zinc-400 font-semibold uppercase tracking-wider`}>Saved</span>
            <span className="bg-zinc-800 text-zinc-300 font-extrabold w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono">
              {saved?.length || 0}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}