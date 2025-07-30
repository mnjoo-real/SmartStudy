import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";

// Grade options shown in Korean UI
const GRADE_OPTIONS = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"];

export default function Goals() {
  const { goals, setGoals } = useApp();

  // Convert object → rows for editable table
  const initialRows = useMemo(
    () => Object.entries(goals).map(([name, g]) => ({ id: crypto.randomUUID(), name, target: g.target, current: g.current })),
    [goals]
  );
  const [rows, setRows] = useState(initialRows);

  const addRow = () => setRows((r) => [...r, { id: crypto.randomUUID(), name: "", target: "A", current: "B" }]);
  const removeRow = (id) => setRows((r) => r.filter((x) => x.id !== id));

  const updateCell = (id, key, value) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, [key]: value } : x)));
  };

  // Save rows → goals object (ignore empty subject names)
  const save = () => {
    const next = {};
    rows.forEach((r) => {
      const name = (r.name || "").trim();
      if (!name) return;
      next[name] = { target: r.target, current: r.current };
    });
    setGoals(next);
  };

  return (
    <section>
      <h2>목표 설정</h2>
      <p className="muted">상단 열에 <strong>목표</strong>(Target)와 <strong>현재</strong>(Current)를 선택하고, 왼쪽 첫 열에 과목명을 입력하세요.</p>

      <div className="card">
        <div className="goals-toolbar">
          <button className="btn" onClick={addRow}>+ 과목 추가</button>
        </div>
        <div className="table-wrapper">
          <table className="goals-table">
            <thead>
              <tr>
                <th style={{width: "40%"}}>과목</th>
                <th>목표</th>
                <th>현재</th>
                <th style={{width: 64}}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      value={row.name}
                      placeholder="예: 수학"
                      onChange={(e) => updateCell(row.id, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <select value={row.target} onChange={(e) => updateCell(row.id, "target", e.target.value)}>
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={row.current} onChange={(e) => updateCell(row.id, "current", e.target.value)}>
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </td>
                  <td className="cell-actions">
                    <button className="icon-btn" title="행 삭제" onClick={() => removeRow(row.id)}>−</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button className="btn" onClick={save}>저장</button>
        <button className="btn btn--ghost" onClick={addRow}>+ 과목 추가</button>
      </div>
    </section>
  );
}