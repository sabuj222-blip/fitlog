import Image from "next/image";
import DetailActions from "../../components/DetailActions";

// Fetch and match by id or slug flexible conversion
async function getWorkoutDetail(id) {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const workouts = await res.json();
    
    // Check match by string ID, numeric ID, or slug
    return workouts.find(
      (w) =>
        String(w.id).toLowerCase() === String(id).toLowerCase() ||
        String(w.slug).toLowerCase() === String(id).toLowerCase()
    ) || null;
  } catch (error) {
    return null;
  }
}

export default async function WorkoutDetailPage({ params }) {
  const resolvedParams = await params;
  const workout = await getWorkoutDetail(resolvedParams.id);

  if (!workout) {
    return (
      <div className="min-h-[70vh] bg-[#0a0a0c] text-white flex items-center justify-center">
        <p className="text-red-400 font-mono">Workout not found!</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Column: Visual Banner */}
        <div className="bg-zinc-950 rounded-xl p-6 flex items-center justify-center border border-zinc-800 relative min-h-[350px]">
          <img
            src={workout.image || "/hero-banner.png"}
            alt={workout.name}
            className="max-h-[300px] max-w-full object-contain p-4"
          />
        </div>

        {/* Right Column: Key Details & Specs */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {workout.category?.map((cat, idx) => (
                <span key={idx} className="bg-zinc-800 text-[#ccff00] text-xs font-bold px-2.5 py-1 rounded uppercase">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 uppercase tracking-wide font-mono text-white">
              {workout.name}
            </h1>
            <p className="text-zinc-400 text-sm mb-6">{workout.description}</p>

            {/* Spec Table Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 mb-6 text-xs font-mono">
              <div><p className="text-zinc-500 uppercase">Equipment</p><p className="font-semibold text-white">{workout.equipment}</p></div>
              <div><p className="text-zinc-500 uppercase">Difficulty</p><p className="font-semibold text-white">{workout.difficulty}</p></div>
              <div><p className="text-zinc-500 uppercase">Sets / Reps</p><p className="font-semibold text-white">{workout.sets} x {workout.reps}</p></div>
              <div><p className="text-zinc-500 uppercase">Duration</p><p className="font-semibold text-white">{workout.duration} min</p></div>
              <div><p className="text-zinc-500 uppercase">Calories</p><p className="font-semibold text-white">{workout.calories} kcal</p></div>
              <div><p className="text-zinc-500 uppercase">Rating</p><p className="font-semibold text-white">{workout.rating} / 5</p></div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="mb-8">
              <h3 className="font-bold text-sm uppercase text-zinc-300 mb-3 tracking-wider font-mono">INSTRUCTIONS</h3>
              <ol className="space-y-2 text-xs text-zinc-400">
                {workout.instructions?.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-[#ccff00] font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Action Buttons */}
          <DetailActions workout={workout} />
        </div>
      </div>
    </div>
  );
}