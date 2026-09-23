import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-7xl font-extrabold text-[#ccff00] mb-2 font-mono">404</h1>
      <h2 className="text-2xl font-bold uppercase mb-2 font-mono">Page Not Found</h2>
      <p className="text-zinc-500 text-sm mb-6">Looks like you took a wrong turn in the gym.</p>
      <Link href="/" className="bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg text-sm font-mono uppercase">
        Back to Safety
      </Link>
    </div>
  );
}