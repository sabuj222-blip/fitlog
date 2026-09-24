import Image from "next/image";
import { Oswald } from "next/font/google";

// Oswald Font Config
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function Footer() {
  return (
    <footer className="bg-[#0f0f11] border-t border-zinc-800 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog Logo" width={20} height={20} className="object-contain" />
          <span className={`${oswald.className} font-bold text-white tracking-wider text-base uppercase`}>
            FITLOG
          </span>
        </div>
        <p className="font-sans">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}