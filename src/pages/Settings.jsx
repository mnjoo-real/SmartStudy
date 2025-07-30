import React from "react";
import { useApp } from "../context/AppContext";

export default function Settings() {
  const { notifications, setNotifications } = useApp();
  return (
    <section>
      <h2>설정</h2>
      <label className="row">
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        리마인더 활성화(데모)
      </label>
    </section>
  );
}