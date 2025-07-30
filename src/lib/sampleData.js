// File: src/lib/sampleData.js
// Demo data + simple recompute function. Replace with real logic.

export const defaultGoals = {
  "수학": { current: "B", target: "A" },
  "국어": { current: "B+", target: "A" },
  "영어": { current: "A-", target: "A" },
  "과학": { current: "B", target: "A-" },
};

export function demoPlan() {
  // Very naive weekly plan for demo purposes
  const subjects = Object.keys(defaultGoals);
  return {
    week: Array.from({ length: 7 }, (_, day) => ({
      day,
      tasks: subjects.map((s) => ({ subject: s, minutes: 40, note: "Review + practice" })),
    })),
  };
}

export function demoProgress() {
  return [
    { subject: "수학", completed: 60 },
    { subject: "국어", completed: 40 },
    { subject: "영어", completed: 55 },
    { subject: "과학", completed: 35 },
  ];
}

export function recompute(goals) {
  // Dummy weight: diff between target and current → minutes
  const weights = Object.fromEntries(
    Object.entries(goals).map(([s, g]) => [s, gapScore(g.current, g.target)])
  );
  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;

  const perDay = 160; // total minutes/day (demo)
  const subjects = Object.keys(goals);

  return {
    week: Array.from({ length: 7 }, (_, day) => ({
      day,
      tasks: subjects.map((s) => ({
        subject: s,
        minutes: Math.round((weights[s] / total) * perDay),
        note: "Auto-allocated",
      })),
    })),
  };
}

function gapScore(current, target) {
  // Convert grades to numbers crudely: A=4, A-=3.7, B+=3.3, B=3, ...
  const map = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0 };
  const c = map[current] ?? 3.0;
  const t = map[target] ?? 4.0;
  return Math.max(0.5, t - c + 0.7); // ensure non-zero weight
}
