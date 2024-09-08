"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resource";

const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
i18next.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18next;