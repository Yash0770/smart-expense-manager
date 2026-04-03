export const setTheme = (theme: "light" | "dark") => {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

export const initTheme = () => {
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;

  if (saved) {
    setTheme(saved);
  }
};