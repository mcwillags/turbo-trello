export namespace LoginConfig {
  export const encryptHash = 10;

  export const maximumLoginAttempts = 5;

  export const loginRestrictionTimeMs = 15 * 60_000;

  export const defaultBanStart = new Date("1989-12-31T21:00:00.000Z");
}
