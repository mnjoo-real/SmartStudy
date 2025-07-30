import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from "recharts";

export default function Progress() {
  const { progress } = useApp();

  // Derive simple aggregates for the summary
  const avg = useMemo(() => Math.round(progress.reduce((a, b) => a + b.completed, 0) / Math.max(progress.length, 1)), [progress]);
  const best = useMemo(() => progress.slice().sort((a,b)=>b.completed-a.completed)[0] || {subject:"수학", completed:0}, [progress]);
  const weakest = useMemo(() => progress.slice().sort((a,b)=>a.completed-b.completed)[0] || {subject:"과목", completed:0}, [progress]);

  // Demo time‑series for study habit improvements (weekly)
  const habitTrend = [
    { week: "W1", 집중도: 58, 계획이행: 52 },
    { week: "W2", 집중도: 62, 계획이행: 60 },
    { week: "W3", 집중도: 67, 계획이행: 65 },
    { week: "W4", 집중도: 72, 계획이행: 70 },
  ];

  const userName = "홍길동"; // TODO: replace with real user profile name

  return (
    <section>
      <h2>Progress</h2>

      {/* Summary banner */}
      <div className="summary-banner">
        <div className="summary-title">
          {userName} 님, 지난 4주간 학습 지표가 꾸준히 개선되고 있어요.
        </div>
        <ul className="summary-bullets">
          <li>이번 주 평균 완료율 <strong>{avg}%</strong> (최고: {best.subject} {best.completed}%).</li>
          <li>계획 이행률이 <strong>+18%</strong>p 상승(4주 기준).</li>
          <li>다음 주 집중 권장 과목: <strong>{weakest.subject}</strong>.</li>
        </ul>
      </div>

      {/* Grid of analytic blocks */}
      <div className="insight-grid">
        <div className="card insight">
          <h3>과목별 완료율</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={progress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis unit="%" domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="completed" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card insight">
          <h3>학습 습관 트렌드</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={habitTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis unit="%" domain={[0,100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="집중도" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="계획이행" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card insight">
          <h3>다음 주 권장 액션</h3>
          <ul className="actions">
            <li><strong>{weakest.subject}</strong> 집중 블록을 매일 25분 × 3회 배치</li>
            <li>취약 단원 3문제 → 해설 재구성(자기설명) → 오답노트 기록</li>
            <li>매일 밤 10분, 다음날 계획 미리 점검(체크리스트 5개 이내)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}