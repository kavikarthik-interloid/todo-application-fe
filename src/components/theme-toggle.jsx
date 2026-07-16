import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

const getInitial = () =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Keep following the OS until the user makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isDark = theme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      {isDark ? (
        <SunIcon className="h-[18px] w-[18px]" />
      ) : (
        <MoonIcon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
};

export default ThemeToggle;
