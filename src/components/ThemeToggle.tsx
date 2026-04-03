"use client";

import { useEffect, useState } from "react";
import { setTheme, initTheme } from "@/src/lib/theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    initTheme();
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const newTheme = dark ? "light" : "dark";
    setTheme(newTheme);
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 border rounded-lg text-sm"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}