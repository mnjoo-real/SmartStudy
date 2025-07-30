import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "SmartStudy – 목표 맞춤 공부 루틴 자동 생성 플랫폼";
  }, []);

  return (
    <section>
      <h1>SmartStudy – 목표 맞춤 공부 루틴 자동 생성 플랫폼</h1>
      <p className="lead">
        고등학생의 목표, 현재 실력, 학습 성향을 바탕으로 과목별 공부 비율과
        주간·일간 계획을 자동 생성합니다. AI 코치가 공부법과 시간 분배 팁을
        제안하며, 학부모는 읽기 전용 모드로 학습 현황을 간단히 열람할 수 있습니다.
      </p>
      <div className="grid">
        <Card title="1) 목표 입력 기반 루틴 추천">
          사용자가 설정한 목표와 현재 실력을 비교하여 우선순위와 시간 배분을 자동 계산합니다.
        </Card>
        <Card title="2) 주간/일간 계획 자동 생성">
          자동 생성된 루틴으로 주간·일간 계획표와 To‑Do 리스트를 만듭니다. 일정은 자유롭게 수정 가능합니다.
        </Card>
        <Card title="3) AI 기반 공부 피드백">
          GPT API로 "이번 주 집중 과목?", "공부법 추천" 등에 응답하고, 동기부여 문장도 제공합니다.
        </Card>
        <Card title="4) 진행률 & 리마인더">
          이행 체크 · 미이행 리마인더 · 주간 피드백 기반 루틴 자동 수정을 지원합니다.
        </Card>
        <Card title="5) 학부모 열람 모드(선택)">
          학부모는 자녀의 루틴과 진척률을 읽기 전용으로 확인할 수 있습니다.
        </Card>
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
