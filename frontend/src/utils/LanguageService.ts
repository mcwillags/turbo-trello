import i18next from "i18next";

import { AppLanguage } from "~constants/LanguageConstants.ts";

export class LanguageService {
  static changeLanguage(currentLanguage: AppLanguage) {
    i18next.changeLanguage(currentLanguage);
  }

  static get currentLanguage(): AppLanguage {
    return i18next.language as AppLanguage;
  }
}
