import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { resources } from "~assets/translations/translation.resources.ts";
import { AppLanguage } from "~constants/LanguageConstants.ts";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: AppLanguage.EN,
    interpolation: {
      escapeValue: false,
    },
  });
