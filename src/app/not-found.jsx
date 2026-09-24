import Link from "next/link";
import { Oswald } from "next/font/google";

// Oswald Font Initialize
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6 text-center">
      {/* 404 Heading with Oswald */}
      <h1 className={`${oswald.className} text-7xl font-extrabold text-[#ccff00] mb-2 tracking-wide`}>
        404
      </h1>

      {/* Page Not Found Title with Oswald */}
      <h2 className={`${oswald.className} text-2xl font-bold uppercase mb-2 tracking-wide`}>
        Page Not Found
      </h2>

      <p className="text-zinc-500 text-sm mb-6">
        Looks like you took a wrong turn in the gym.
      </p>

      {/* Button with Oswald */}
      <Link 
        href="/" 
        className={`${oswald.className} bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold px-6 py-3 rounded-lg text-sm uppercase tracking-wider transition-colors`}
      >
        Back to Safety
      </Link>
    </div>
  );
}