import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} SmartStudy
      </p>
      <a href="https://github.com/mnjoo-real/SmartStudy" target="_blank" rel="noopener noreferrer" className="github-link">
        <FaGithub size={20} /> GitHub
      </a>
    </footer>
  );
}