export namespace ValidationConstants {
  export const EMAIL_REGEXP_PATTERN =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  export const MIN_PASSWORD_LENGTH = 12;
  export const MAX_PASSWORD_LENGTH = 60;
}

export const validationKeys = {
  REQUIRED: "REQUIRED",
  EMAIL: "EMAIL",
  NOT_CHECKED: "NOT_CHECKED",
  MIN_LENGTH: "MIN_LENGTH",
  MAX_LENGTH: "MAX_LENGTH",
} as const;

export const validationTranslationKeys = {
  [validationKeys.REQUIRED]: "VALIDATION_MESSAGE.REQUIRED",
  [validationKeys.EMAIL]: "VALIDATION_MESSAGE.EMAIL",
  [validationKeys.NOT_CHECKED]: "VALIDATION.NOT_CHECKED",
  [validationKeys.MIN_LENGTH]: "VALIDATION_MESSAGE.MIN_LENGTH",
  [validationKeys.MAX_LENGTH]: "VALIDATION_MESSAGE.MAX_LENGTH",
};
