import { InvalidCredentialsError, LoginRestrictedError } from "../../api/auth/AuthApiTypes.ts";

export namespace LoginPageFunctions {
  export const isLoginRestricted = (
    error: LoginRestrictedError | InvalidCredentialsError
  ): error is LoginRestrictedError => {
    return Object.keys(error).some((key) => key === "banTimeRemaining");
  };
}
