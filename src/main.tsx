import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import i18n from "./i18n";

const initialLang =
  i18n.language || localStorage.getItem("i18nextLng") || navigator.language;
const initialDir = initialLang && initialLang.startsWith("fa") ? "rtl" : "ltr";
document.documentElement.dir = initialDir;
document.documentElement.lang = initialLang.startsWith("fa") ? "fa" : "en";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
