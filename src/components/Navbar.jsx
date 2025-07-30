import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { role, toggleRole } = useApp();

  return (
    <header className="navbar">
      <div className="navbar__left">
        <span className="logo">SmartStudy</span>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/goals">Goals</NavLink>
          <NavLink to="/planner">Planner</NavLink>
          <NavLink to="/coach">AI Coach</NavLink>
          <NavLink to="/progress">Progress</NavLink>
          <NavLink to="/parent">Parent View</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </div>
      <div className="navbar__right">
        {/* Simple role toggle to preview Student vs Parent read-only */}
        <button className="btn" onClick={toggleRole}>
          Role: {role}
        </button>
      </div>
    </header>
  );
}