"use client";

import { useEffect, useState } from "react";
import { setTheme, initTheme } from "@/src/lib/theme";
import Icon from "./ui/Icon/Icon";

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
    <button onClick={toggle} className="px-2 py-1">
      {dark ? (
        <Icon name="sunIcon" size={20} className="text-yellow-200" />
      ) : (
        <Icon name="moonIcon" size={20} className="" />
      )}
    </button>
  );
}
