"use client";

import { createContext, useContext, useState, useEffect } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");
    if (localPlan) {
      try { setPlan(JSON.parse(localPlan)); } catch (e) { console.error(e); }
    }
    if (localSaved) {
      try { setSaved(JSON.parse(localSaved)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const getItemId = (item) => String(item?.id || item?._id || "").trim();

  const addToPlan = (workout) => {
    setPlan((prev) => {
      if (prev.length >= 5) return prev;
      const targetId = getItemId(workout);
      if (prev.some((item) => getItemId(item) === targetId)) return prev;
      return [...prev, workout];
    });
  };

  const addToSaved = (workout) => {
    setSaved((prev) => {
      const targetId = getItemId(workout);
      if (prev.some((item) => getItemId(item) === targetId)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromPlan = (id) => {
    const targetId = String(id).trim();
    setPlan((prev) => prev.filter((item) => getItemId(item) !== targetId));
  };

  const removeFromSaved = (id) => {
    const targetId = String(id).trim();
    setSaved((prev) => prev.filter((item) => getItemId(item) !== targetId));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);