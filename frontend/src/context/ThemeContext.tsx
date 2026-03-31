import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

interface ThemeContextType {
  /** The resolved theme currently applied (always "light" or "dark") */
  theme: Theme;
  /** The user's preference — may be "system" */
  preference: ThemePreference;
  /** Set the preference. "system" follows OS, "light"/"dark" are explicit. */
  setPreference: (pref: ThemePreference) => void;
  /** Convenience toggle: cycles light → dark → light (sets explicit, not system) */
  toggle: () => void;
}

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  preference: "system",
  setPreference: () => {},
  toggle: () => {},
});

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  // 1. Prefer OS-level preference if explicitly set
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  // Check if the browser actually reports a preference (some don't)
  const hasExplicitPreference =
    mq.matches || window.matchMedia("(prefers-color-scheme: light)").matches;
  if (hasExplicitPreference) {
    return mq.matches ? "dark" : "light";
  }
  // 2. Fallback: use local time (dark between 7 PM and 7 AM)
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? "dark" : "light";
}

function getSavedPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark" || saved === "system") return saved;
  return "system";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function resolveTheme(pref: ThemePreference): Theme {
  return pref === "system" ? getSystemTheme() : pref;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(getSavedPreference);
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(preference));

  // Apply theme to DOM BEFORE browser paints to avoid flash/mismatch
  // useLayoutEffect fires synchronously after DOM mutation but before paint
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for OS preference changes when in "system" mode
  useEffect(() => {
    if (preference !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? "dark" : "light";
      setTheme(resolved);
      applyTheme(resolved); // sync DOM immediately
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference]);

  const setPreference = useCallback((pref: ThemePreference) => {
    const resolved = resolveTheme(pref);
    setPreferenceState(pref);
    localStorage.setItem(STORAGE_KEY, pref);
    setTheme(resolved);
    // Apply .dark class SYNCHRONOUSLY so CSS and React state never diverge
    applyTheme(resolved);
  }, []);

  const toggle = useCallback(() => {
    setPreference(theme === "light" ? "dark" : "light");
  }, [theme, setPreference]);

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
export function useTheme() {
  return useContext(ThemeContext);
}
