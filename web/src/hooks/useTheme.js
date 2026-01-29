import { useEffect, useState, useCallback } from "react";
import { THEMES, THEME_STORAGE_KEY } from "@/utils/constants";

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === THEMES.LIGHT || stored === THEMES.DARK) return stored;

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? THEMES.DARK : THEMES.LIGHT;
  } catch (err) {
    return THEMES.LIGHT;
  }
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  const applyTheme = useCallback((t) => {
    const el = document.documentElement;
    el.setAttribute("data-theme", t);
    if (t === THEMES.DARK) el.classList.add("dark");
    else el.classList.remove("dark");
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  }, []);

  return { theme, toggleTheme };
}
