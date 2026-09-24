"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // LocalStorage theke data load kora
  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
    const savedList = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
    setPlan(savedPlan);
    setSaved(savedList);
  }, []);

  // LocalStorage e data save kora
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  // Max 5 workouts cap check ebong Add to Plan
  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      toast.error("Cap of five lifts reached!");
      return;
    }
    if (plan.some((item) => String(item.id) === String(workout.id))) {
      toast("Already in today's plan!", { icon: "ℹ️" });
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    toast.success("Added to today's plan!");
  };

  // Save for later
  const addToSaved = (workout) => {
    if (saved.some((item) => String(item.id) === String(workout.id))) {
      toast("Already saved for later!", { icon: "ℹ️" });
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later!");
  };

  // Toggle Done status
  const toggleDone = (id) => {
    setPlan(
      plan.map((item) =>
        String(item.id) === String(id) ? { ...item, done: !item.done } : item
      )
    );
    toast.success("Workout status updated!");
  };

  // Remove from Plan
  const removeFromPlan = (id) => {
    setPlan((prevPlan) =>
      prevPlan.filter((item) => String(item.id) !== String(id))
    );
    toast.success("Removed from today's plan!");
  };

  // Remove from Saved
  const removeFromSaved = (id) => {
    setSaved((prevSaved) =>
      prevSaved.filter((item) => String(item.id) !== String(id))
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