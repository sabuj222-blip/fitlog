// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import DetailActions from "../../components/DetailActions";
// import { Oswald } from "next/font/google";

// const oswald = Oswald({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
// });

// export default function WorkoutDetailPage() {
//   const params = useParams();
//   const id = params?.id;

//   const [workout, setWorkout] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getNum = (val) => {
//     if (!val) return 0;
//     if (typeof val === "number") return val;
//     const parsed = parseFloat(String(val).replace(/[^0-9.]/g, ""));
//     return isNaN(parsed) ? 0 : parsed;
//   };

//   useEffect(() => {
//     if (!id) return;
//     async function fetchWorkout() {
//       try {
//         setLoading(true);
//         const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
//         const workouts = await res.json();

//         if (Array.isArray(workouts)) {
//           const targetId = String(id).trim().toLowerCase();

         
//           const found = workouts.find((w) => {
//             const wId = String(w.id || "").trim().toLowerCase();
//             const wSlug = String(w.slug || "").trim().toLowerCase();
//             return wId === targetId || wSlug === targetId;
//           });
//           setWorkout(found || null);
//         }
//       } catch (err) {
//         console.error("Error fetching detail:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchWorkout();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-[70vh] bg-[#0b0c10] text-white flex flex-col items-center justify-center font-mono">
//         <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="text-zinc-400 text-sm">Loading Workout Details...</p>
//       </div>
//     );
//   }

//   if (!workout) {
//     return (
//       <div className="min-h-[70vh] bg-[#0b0c10] text-white flex flex-col items-center justify-center font-mono gap-3">
//         <p className={`${oswald.className} text-red-400 text-xl font-bold uppercase tracking-wide`}>
//           Workout not found!
//         </p>
//         <p className="text-zinc-500 text-xs">Requested ID: {id || "None"}</p>
//       </div>
//     );
//   }

//   const durationVal = getNum(workout.duration);
//   const caloriesVal =
//     getNum(workout.calories || workout.calorie || workout.kcal) ||
//     (durationVal ? durationVal * 8 : 150);

//   return (
//     <div className="bg-[#0b0c10] text-white min-h-screen py-8 px-4 sm:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
//           <div className="lg:col-span-6 w-full">
//             <div className="relative w-full aspect-square bg-[#14161f] rounded-3xl overflow-hidden border border-zinc-800/80 shadow-xl">
//               <Image
//                 src={workout.image || "/hero-banner.png"}
//                 alt={workout.name || "Workout image"}
//                 fill
//                 sizes="(max-width: 1024px) 100vw, 50vw"
//                 className="object-cover"
//                 priority
//               />
//             </div>
//           </div>
//           <div className="lg:col-span-6 flex flex-col justify-start">
//             <div className="bg-[#12141c] border border-zinc-800/80 rounded-3xl p-6 sm:p-7 space-y-5">
//               <div>
//                 <h1 className={`${oswald.className} text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-2`}>
//                   {workout.name}
//                 </h1>
//                 <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-mono">
//                   {workout.description || "A targeted exercise to build strength and endurance."}
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {Array.isArray(workout.category) && workout.category.length > 0 ? (
//                     workout.category.slice(0, 2).map((cat, idx) => (
//                       <span
//                         key={idx}
//                         className={`${oswald.className} bg-[#ccff00] text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider`}
//                       >
//                         {cat}
//                       </span>
//                     ))
//                   ) : (
//                     <>
//                       <span className={`${oswald.className} bg-[#ccff00] text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider`}>
//                         CHEST
//                       </span>
//                       <span className={`${oswald.className} bg-[#ccff00] text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider`}>
//                         ARMS
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>
//               <div className="bg-[#181a24] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 text-xs font-mono space-y-2.5">
//                 <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
//                   <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>EQUIPMENT</span>
//                   <span className="text-zinc-200">{workout.equipment || "Bodyweight"}</span>
//                 </div>
//                 <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
//                   <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>DIFFICULTY</span>
//                   <span className="text-zinc-200">{workout.difficulty || "Intermediate"}</span>
//                 </div>
//                 <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
//                   <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>SETS</span>
//                   <span className="text-zinc-200">{workout.sets || "4"}</span>
//                 </div>
//                 <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
//                   <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>REPS</span>
//                   <span className="text-zinc-200">{workout.reps || "8-12"}</span>
//                 </div>
//                 <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
//                   <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>DURATION</span>
//                   <span className="text-zinc-200">{durationVal} min</span>
//                 </div>
//                 <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
//                   <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>CALORIES</span>
//                   <span className="text-zinc-200">{caloriesVal} kcal</span>
//                 </div>
//                 <div className="flex justify-between items-center pt-0.5">
//                   <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>RATING</span>
//                   <span className="text-zinc-200">{workout.rating || "4.5"}</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className={`${oswald.className} font-bold text-sm uppercase text-white mb-3 tracking-wider`}>
//                   INSTRUCTIONS
//                 </h3>
//                 <ol className="space-y-2 text-xs text-zinc-400 font-mono leading-relaxed">
//                   {Array.isArray(workout.instructions) && workout.instructions.length > 0 ? (
//                     workout.instructions.map((step, idx) => (
//                       <li key={idx} className="flex gap-2">
//                         <span className="text-zinc-500">{idx + 1}.</span>
//                         <span>{step}</span>
//                       </li>
//                     ))
//                   ) : (
//                     <li className="text-zinc-500">No instructions available for this workout.</li>
//                   )}
//                 </ol>
//               </div>
//             </div>
//             <div className="mt-4">
//               <DetailActions workout={{ ...workout, calories: caloriesVal }} />
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import DetailActions from "../../components/DetailActions";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function WorkoutDetailPage() {
  const params = useParams();
  const pathname = usePathname();

  // ১. params.id চেষ্টা করবে, না পেলে URL Path (যেমন /workout/2) থেকে ২ বের করে নেবে
  const pathId = pathname?.split("/").pop();
  const id = params?.id || (pathId !== "workout" ? pathId : null);

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const getNum = (val) => {
    if (!val) return 0;
    if (typeof val === "number") return val;
    const parsed = parseFloat(String(val).replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchWorkout() {
      try {
        setLoading(true);
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const data = await res.json();
        const workouts = Array.isArray(data) ? data : data?.workouts || [];

        if (Array.isArray(workouts) && workouts.length > 0) {
          const targetId = String(id).trim().toLowerCase();

          const found = workouts.find((w) => {
            const wId = String(w.id ?? w._id ?? "").trim().toLowerCase();
            const wSlug = String(w.slug || w.name || "")
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-");
            return wId === targetId || wSlug === targetId;
          });

          setWorkout(found || null);
        } else {
          setWorkout(null);
        }
      } catch (err) {
        console.error("Error fetching detail:", err);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#0b0c10] text-white flex flex-col items-center justify-center font-mono">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-400 text-sm">Loading Workout Details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] bg-[#0b0c10] text-white flex flex-col items-center justify-center font-mono gap-3">
        <p className={`${oswald.className} text-red-400 text-xl font-bold uppercase tracking-wide`}>
          Workout not found!
        </p>
        <p className="text-zinc-500 text-xs">Requested ID: {String(id || "None")}</p>
      </div>
    );
  }

  const durationVal = getNum(workout.duration);
  const caloriesVal =
    getNum(workout.calories || workout.calorie || workout.kcal) ||
    (durationVal ? durationVal * 8 : 150);

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full aspect-square bg-[#14161f] rounded-3xl overflow-hidden border border-zinc-800/80 shadow-xl">
              <Image
                src={workout.image || "/hero-banner.png"}
                alt={workout.name || "Workout image"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="bg-[#12141c] border border-zinc-800/80 rounded-3xl p-6 sm:p-7 space-y-5">
              <div>
                <h1 className={`${oswald.className} text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-2`}>
                  {workout.name}
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-mono">
                  {workout.description || "A targeted exercise to build strength and endurance."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(workout.category) && workout.category.length > 0 ? (
                    workout.category.slice(0, 2).map((cat, idx) => (
                      <span
                        key={idx}
                        className={`${oswald.className} bg-[#ccff00] text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider`}
                      >
                        {cat}
                      </span>
                    ))
                  ) : typeof workout.category === "string" ? (
                    <span className={`${oswald.className} bg-[#ccff00] text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider`}>
                      {workout.category}
                    </span>
                  ) : (
                    <>
                      <span className={`${oswald.className} bg-[#ccff00] text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider`}>
                        CHEST
                      </span>
                      <span className={`${oswald.className} bg-[#ccff00] text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider`}>
                        ARMS
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-[#181a24] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 text-xs font-mono space-y-2.5">
                <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
                  <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>EQUIPMENT</span>
                  <span className="text-zinc-200">{workout.equipment || "Bodyweight"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
                  <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>DIFFICULTY</span>
                  <span className="text-zinc-200">{workout.difficulty || "Intermediate"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
                  <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>SETS</span>
                  <span className="text-zinc-200">{workout.sets || "4"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
                  <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>REPS</span>
                  <span className="text-zinc-200">{workout.reps || "8-12"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
                  <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>DURATION</span>
                  <span className="text-zinc-200">{durationVal} min</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2">
                  <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>CALORIES</span>
                  <span className="text-zinc-200">{caloriesVal} kcal</span>
                </div>
                <div className="flex justify-between items-center pt-0.5">
                  <span className={`${oswald.className} text-zinc-500 uppercase tracking-wider font-semibold`}>RATING</span>
                  <span className="text-zinc-200">{workout.rating || "4.5"}</span>
                </div>
              </div>
              <div>
                <h3 className={`${oswald.className} font-bold text-sm uppercase text-white mb-3 tracking-wider`}>
                  INSTRUCTIONS
                </h3>
                <ol className="space-y-2 text-xs text-zinc-400 font-mono leading-relaxed">
                  {Array.isArray(workout.instructions) && workout.instructions.length > 0 ? (
                    workout.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-zinc-500">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-zinc-500">No instructions available for this workout.</li>
                  )}
                </ol>
              </div>
            </div>
            <div className="mt-4">
              <DetailActions workout={{ ...workout, calories: caloriesVal }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}