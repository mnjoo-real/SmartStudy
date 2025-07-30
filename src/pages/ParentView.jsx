import React from "react";
import { useApp } from "../context/AppContext";

export default function ParentView() {
  const { role, plan, progress } = useApp();

  const localNote = (note) => (note === "Auto‑allocated" || note === "Auto-allocated") ? "자동 배정" : note;

  return (
    <section>
      <h2>학부모 열람</h2>
      {role !== "Parent" && (
        <p className="warning">읽기 전용입니다. 상단에서 역할을 Parent로 전환하여 미리보세요.</p>
      )}
      <div className="card">
        <h3>주간 계획 (읽기 전용)</h3>
        <ul>
          {plan.week.flatMap((d) => d.tasks).slice(0, 8).map((t, i) => (
            <li key={i}>{t.subject} — {t.minutes}분 — {localNote(t.note)}</li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h3>진행 현황</h3>
        <ul>
          {progress.map((p, i) => (
            <li key={i}>{p.subject}: {p.completed}%</li>
          ))}
        </ul>
      </div>
    </section>
  );
}