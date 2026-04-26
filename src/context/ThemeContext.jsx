import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "theme";
const VALID = ["light", "dark", "system"];

function getStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return VALID.includes(v) ? v : "system";
  } catch {
    return "system";
  }
}

function resolveIsDark(theme) {
  if (theme === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches;
  return theme === "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStored);

  const setTheme = (value) => {
    if (!VALID.includes(value)) return;
    localStorage.setItem(STORAGE_KEY, value);
    setThemeState(value);
  };

  const toggleDark = () => setTheme(resolveIsDark(theme) ? "light" : "dark");

  const isDark = resolveIsDark(theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Re-apply when system preference changes while theme === "system"
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => document.documentElement.classList.toggle("dark", mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ isDark, theme, setTheme, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
