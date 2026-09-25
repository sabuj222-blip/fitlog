export default function MyPlanLoading() {
  return (
    <div className="bg-[#0b0c10] text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-[#ccff00] animate-spin"></div>
        </div>
        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest animate-pulse">
          Loading workouts...
        </p>
      </div>
    </div>
  );
}