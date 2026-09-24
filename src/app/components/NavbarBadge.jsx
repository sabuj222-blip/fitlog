"use client";

import Link from "next/link";
import { usePlan } from "../context/PlanContext";
import { Oswald } from "next/font/google";

// Oswald Font Config
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function NavbarBadge() {
  const { plan, saved } = usePlan();

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/my-plan"
        className={`${oswald.className} bg-[#ccff00] text-black text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-opacity-90 transition uppercase tracking-wider`}
      >
        <span>PLAN</span>
        <span className="bg-black text-[#ccff00] px-1.5 py-0.5 rounded-full text-[10px] font-mono">
          {plan.length}
        </span>
      </Link>

      <Link
        href="/my-plan"
        className={`${oswald.className} border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition uppercase tracking-wider`}
      >
        <span>SAVED</span>
        <span className="bg-zinc-800 text-white px-1.5 py-0.5 rounded-full text-[10px] font-mono">
          {saved.length}
        </span>
      </Link>
    </div>
  );
}