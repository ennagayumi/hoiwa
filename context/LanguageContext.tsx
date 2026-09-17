"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, translations } from "@/data/translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)["ja"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ja");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hoiwa_lang") as Locale | null;
    if (saved && (saved === "ja" || saved === "en")) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("hoiwa_lang", newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = translations[locale] || translations.ja;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
