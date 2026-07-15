"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setTheme(saved);
      document.documentElement.className = saved;
    }
  }, []);

  function toggleTheme() {
    const newTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    document.documentElement.className = newTheme;

    localStorage.setItem("theme", newTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}