import { createTheme } from "@mui/material/styles";

const palette = {
  light: {
    primary: {
      main: "#00C0DB",
    },
    secondary: {
      main: "#2170F3",
    },
    error: {
      main: "#F44336",
    },
    warning: {
      main: "#FF9800",
    },
    success: {
      main: "#4CAF50",
    },
    background: {
      default: "#F5F6FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E1E1E",
      secondary: "#5C5C5C",
    },
  },
  dark: {
    primary: {
      main: "#00C0DB",
    },
    secondary: {
      main: "#2170F3",
    },
    error: {
      main: "#F44336",
    },
    warning: {
      main: "#FF9800",
    },
    success: {
      main: "#4CAF50",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#C0C0C0",
    },
  },
};

export const lightTheme = createTheme({
  palette: { ...palette.light, mode: "light" },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h5: { fontWeight: 600, fontSize: "1.25rem" },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 500 },
  },
});

export const darkTheme = createTheme({
  palette: { ...palette.dark, mode: "dark" },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h5: { fontWeight: 600, fontSize: "1.25rem" },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 500 },
  },
});
