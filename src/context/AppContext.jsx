import React, { createContext, useContext, useMemo, useState } from "react";
import { defaultGoals, demoPlan, demoProgress, recompute } from "../lib/sampleData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Role can be "Student" | "Parent" (affects permissions/visibility later)
  const [role, setRole] = useState("Student");
  const [goals, setGoals] = useState(defaultGoals);
  const [plan, setPlan] = useState(demoPlan());
  const [progress, setProgress] = useState(demoProgress());
  const [notifications, setNotifications] = useState(true);

  const toggleRole = () => setRole((r) => (r === "Student" ? "Parent" : "Student"));
  const recomputePlan = () => setPlan(recompute(goals));

  const value = useMemo(
    () => ({
      role,
      toggleRole,
      goals,
      setGoals,
      plan,
      recomputePlan,
      progress,
      setProgress,
      notifications,
      setNotifications,
    }),
    [role, goals, plan, progress, notifications]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}