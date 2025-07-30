import React, { useState } from "react";

export default function Coach() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // NOTE: Replace with real GPT API call.
  const ask = async () => {
    if (!question.trim()) return;
    // Simulate async response
    setAnswer("(데모) 이번 주는 취약 과목에 25-5 포모도로로 집중해 보세요.");
  };

  return (
    <section>
      <h2>AI 코치</h2>
      <div className="row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="질문해보세요: 이번 주 집중해야 할 과목은?"
          onKeyDown={(e) => e.key === 'Enter' && ask()}
        />
        <button className="btn" onClick={ask}>질문하기</button>
      </div>
      {answer && (
        <div className="card">
          <strong>응답</strong>
          <p>{answer}</p>
        </div>
      )}
    </section>
  );
}