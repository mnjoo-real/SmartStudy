import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Goals from "./pages/Goals";
import Planner from "./pages/Planner";
import Coach from "./pages/Coach";
import Progress from "./pages/Progress";
import ParentView from "./pages/ParentView";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      {/* Root layout with shared nav/footer */}
      <Route element={<Layout />}> 
        <Route index element={<Home />} />
        <Route path="goals" element={<Goals />} />
        <Route path="planner" element={<Planner />} />
        <Route path="coach" element={<Coach />} />
        <Route path="progress" element={<Progress />} />
        <Route path="parent" element={<ParentView />} />
        <Route path="settings" element={<Settings />} />
        {/* Unknown routes → redirect home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}