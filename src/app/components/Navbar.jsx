"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ planCount = 0, savedCount = 0 }) {
  const pathname = usePathname();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="bg-[#0a0a0c] border-b border-zinc-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-[#ccff00]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 6.29 3.43 4.86 2 3.43 3.43 2 4.86 3.43 6.29 2 7.71 3.43 9.14 2 10.57 3.43 12 7 3.43 15.57 7 12 8.43 13.43 7 14.86 8.43 16.29 7 17.71 8.43 19.14 7 20.57 8.43 22 9.86 20.57 11.29 22 12.71 20.57 14.14 22 15.57 20.57 17 22 18.43 20.57 19.86 22 21.29 20.57 20.57 20.57z" />
          </svg>
          <span className="font-extrabold tracking-wider text-lg font-mono">
            FITLOG
          </span>
        </Link>

        {/* Middle: Navigation Links (Workouts & My Plan) */}
        <nav className="flex items-center gap-2 bg-zinc-900/80 p-1 rounded-full border border-zinc-800">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isWorkoutsActive
                ? "bg-[#ccff00] text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isMyPlanActive
                ? "bg-[#ccff00] text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badges / Counter Buttons */}
        <div className="flex items-center gap-3 text-xs font-mono">
          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-full transition"
          >
            <span className="text-zinc-400">Plan</span>
            <span className="bg-[#ccff00] text-black font-bold w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge */}
          <button
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-full transition cursor-pointer"
          >
            <span className="text-zinc-400">Saved</span>
            <span className="bg-zinc-800 text-zinc-300 font-bold w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {savedCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}