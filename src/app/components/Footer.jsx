import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f11] border-t border-zinc-800 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog Logo" width={20} height={20} className="object-contain" />
          <span className="font-bold text-white tracking-wider text-sm font-mono">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}