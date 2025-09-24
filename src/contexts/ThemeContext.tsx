import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "../theme";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const getInitialDarkMode = () => {
    if (typeof window === "undefined") return false;
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
    } catch (error) {
      console.error(error);
    }
    return (
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false
    );
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("theme");
      if (!saved) setIsDarkMode(e.matches);
    };
    media.addEventListener?.("change", onChange);
    return () => {
      media.removeEventListener?.("change", onChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
