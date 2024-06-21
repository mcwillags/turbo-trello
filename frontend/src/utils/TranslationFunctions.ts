import { ValidationConstants, validationKeys, validationTranslationKeys } from "~constants/ValidationConstants.ts";
import { ValidationKey } from "~types/TranslationTypes.ts";

export namespace TranslationFunctions {
  export const getTranslationParams = (
    potentialValidationKey: string
  ): [string] | [string, Record<string, unknown>] | null => {
    if (!checkValidationKey(potentialValidationKey)) return null;

    switch (potentialValidationKey) {
      case validationKeys.MIN_LENGTH: {
        return [validationTranslationKeys[potentialValidationKey], { value: ValidationConstants.MIN_PASSWORD_LENGTH }];
      }
      case validationKeys.MAX_LENGTH: {
        return [validationTranslationKeys[potentialValidationKey], { value: ValidationConstants.MAX_PASSWORD_LENGTH }];
      }
      default: {
        return [validationTranslationKeys[potentialValidationKey]];
      }
    }
  };

  export const checkValidationKey = (key: string): key is ValidationKey => {
    return validationKeys[key as ValidationKey] !== undefined;
  };
}
