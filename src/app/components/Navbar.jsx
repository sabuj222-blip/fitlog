"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";
import { Oswald } from "next/font/google";
import { Menu, X } from "lucide-react";


const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="bg-[#0b0c10] border-b border-zinc-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between relative">


        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>


        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={32}
              height={32}
              className="hidden md:block w-8 h-8 object-contain"
            />
            <span className={`${oswald.className} font-bold tracking-wider text-xl sm:text-2xl text-white uppercase`}>
              FITLOG
            </span>
          </Link>
        </div>


        <nav className="hidden md:flex items-center gap-1.5 bg-[#12141a] p-1.5 rounded-full border border-zinc-800/60">
          <Link
            href="/"
            className={`${oswald.className} px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${isWorkoutsActive
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
              }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`${oswald.className} px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${isMyPlanActive
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
              }`}
          >
            My Plan
          </Link>
        </nav>


        <div className="flex items-center gap-1.5 sm:gap-3 text-xs">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 sm:gap-2.5 bg-[#12141a] border border-zinc-800/80 hover:border-zinc-700 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition"
          >
            <span className={`${oswald.className} text-zinc-400 font-semibold uppercase tracking-wider text-[10px] sm:text-xs`}>
              Plan
            </span>
            <span className="bg-[#ccff00] text-black font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-mono">
              {plan?.length || 0}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 sm:gap-2.5 bg-[#12141a] border border-zinc-800/80 hover:border-zinc-700 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition"
          >
            <span className={`${oswald.className} text-zinc-400 font-semibold uppercase tracking-wider text-[10px] sm:text-xs`}>
              Saved
            </span>
            <span className="bg-zinc-800 text-zinc-300 font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-mono">
              {saved?.length || 0}
            </span>
          </Link>
        </div>

      </div>


      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#12141a] border-b border-zinc-800 px-6 py-4 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`${oswald.className} py-2.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${isWorkoutsActive
                ? "bg-[#ccff00] text-black"
                : "text-zinc-400 hover:text-white bg-zinc-900/50"
              }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`${oswald.className} py-2.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${isMyPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-zinc-400 hover:text-white bg-zinc-900/50"
              }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
}