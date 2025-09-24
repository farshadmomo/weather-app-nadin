import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./translations/en.json";
import fa from "./translations/fa.json";

const resources = {
  en: {
    translation: en,
  },
  fa: {
    translation: fa,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// Set document direction based on language
const applyDir = (lng: string | undefined) => {
  const lang =
    lng ||
    (typeof window !== "undefined"
      ? localStorage.getItem("i18nextLng") || navigator.language
      : "en");
  const dir = lang && lang.startsWith("fa") ? "rtl" : "ltr";
  if (typeof document !== "undefined") {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang.startsWith("fa") ? "fa" : "en";
  }
};

i18n.on("initialized", () => {
  applyDir(i18n.language);
});

i18n.on("languageChanged", (lng) => {
  applyDir(lng);
});

export default i18n;
