"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // LocalStorage theke initial data load kora
  useEffect(() => {
    try {
      const savedPlan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
      const savedList = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
      setPlan(savedPlan);
      setSaved(savedList);
    } catch (err) {
      console.error("Error loading plan from localStorage:", err);
    }
  }, []);

  // LocalStorage e data sync kora
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  // Helper function to safely get item ID
  const getItemId = (item) => String(item?.id || item?._id || "").trim();

  // Max 5 workouts cap check ebong Add to Plan
  const addToPlan = (workout) => {
    const targetId = getItemId(workout);

    if (plan.length >= 5) {
      toast.error("Cap of five lifts reached!");
      return;
    }

    if (plan.some((item) => getItemId(item) === targetId)) {
      toast("Already in today's plan!", { icon: "ℹ️" });
      return;
    }

    setPlan([...plan, { ...workout, done: false }]);
    toast.success("Added to today's plan!");
  };

  // Save for later
  const addToSaved = (workout) => {
    const targetId = getItemId(workout);

    if (saved.some((item) => getItemId(item) === targetId)) {
      toast("Already saved for later!", { icon: "ℹ️" });
      return;
    }

    setSaved([...saved, workout]);
    toast.success("Saved for later!");
  };

  // Toggle Done status
  const toggleDone = (id) => {
    const targetId = String(id).trim();

    setPlan(
      plan.map((item) =>
        getItemId(item) === targetId ? { ...item, done: !item.done } : item
      )
    );
    toast.success("Workout status updated!");
  };

  // Remove from Plan
  const removeFromPlan = (id) => {
    const targetId = String(id).trim();

    setPlan((prevPlan) =>
      prevPlan.filter((item) => getItemId(item) !== targetId)
    );
    toast.success("Removed from today's plan!");
  };

  // Remove from Saved
  const removeFromSaved = (id) => {
    const targetId = String(id).trim();

    setSaved((prevSaved) =>
      prevSaved.filter((item) => getItemId(item) !== targetId)
    );
    toast.success("Removed from saved!");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        toggleDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);