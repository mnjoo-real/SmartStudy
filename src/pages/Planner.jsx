import React from "react";
import { useApp } from "../context/AppContext";

export default function Planner() {
  const { plan, recomputePlan } = useApp();

  const localizeNote = (note) => {
    if (note === "Auto‑allocated" || note === "Auto-allocated") return "자동 배정";
    if (note === "Review + practice") return "복습 + 연습";
    return note;
  };

  return (
    <section>
      <h2>플래너</h2>
      <p className="muted">자동 생성된 주간/일간 계획입니다. (학생이 직접 편집 가능 예정)</p>
      <div className="plan-grid">
        {plan.week.map((day, idx) => (
          <div key={idx} className="card card--day">
            <h4>{idx + 1}일차</h4>
            <ul className="tasks">
              {day.tasks.map((t, i) => (
                <li key={i} className="task-item">
                  <span className="task-subject">{t.subject}</span>
                  <span className="task-min">{t.minutes}분</span>
                  <span className="task-note">{localizeNote(t.note)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="btn" onClick={recomputePlan}>계획 재생성(데모)</button>
    </section>
  );
}