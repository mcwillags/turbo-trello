import { AppLanguage } from "~constants/LanguageConstants.ts";

import { enTranslations } from "./en.ts";
import { ukTranslations } from "./uk.ts";

export const resources = {
  [AppLanguage.EN]: enTranslations,
  [AppLanguage.UK]: ukTranslations,
};
