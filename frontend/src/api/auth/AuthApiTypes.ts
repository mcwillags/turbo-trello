import { IUser } from "~types/User.ts";

// Requests

export interface ICreateUser {
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

// Responses

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IResetSessionResponse {
  user: IUser;
  accessToken: string;
}

// Errors

export interface RegisterError {
  message: string;
}

export interface InvalidCredentialsError {
  message: string;
}

export interface LoginRestrictedError {
  message: string;
  banTimeRemaining: number;
}

export interface UnauthorizedError {
  message: string;
}
