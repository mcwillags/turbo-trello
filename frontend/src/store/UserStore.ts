import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";

import { AccessTokenApi } from "../api/AccessTokenApi.ts";
import { AuthApi } from "../api/auth/AuthApi.ts";
import {
  RegisterError,
  ICreateUser,
  ILoginResponse,
  ILoginUser,
  LoginRestrictedError,
  InvalidCredentialsError,
  UnauthorizedError,
  IResetSessionResponse,
} from "../api/auth/AuthApiTypes.ts";
import { OnErrorCallback, OnSuccessCallback } from "~types/StoreTypes.ts";
import { IUser } from "~types/User.ts";

export class UserStore {
  user: IUser | null = null;

  accessToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    AccessTokenApi.setToken(token);
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async loginUser<TError = LoginRestrictedError | InvalidCredentialsError>(
    body: ILoginUser,
    onSuccess?: OnSuccessCallback<ILoginResponse>,
    onError?: OnErrorCallback<TError>
  ) {
    try {
      const { data } = await AuthApi.loginUser(body);

      this.setUser(data.user);
      this.setAccessToken(data.accessToken);

      AccessTokenApi.setToken(data.accessToken);

      if (onSuccess) onSuccess(data);
    } catch (error) {
      const errorResponse = (error as AxiosError<TError>).response!.data;

      if (onError) onError(errorResponse);
    }
  }

  async registerUser<TError = RegisterError>(
    body: ICreateUser,
    onSuccess?: OnSuccessCallback<void>,
    onError?: OnErrorCallback<TError>
  ) {
    try {
      const { data } = await AuthApi.createUser(body);

      if (onSuccess) onSuccess(data);
    } catch (error) {
      const errorResponse = (error as AxiosError<TError>).response!.data;

      if (onError) onError(errorResponse);
    }
  }

  async resetSession<TError = UnauthorizedError>(
    onSuccess?: OnSuccessCallback<IResetSessionResponse>,
    onError?: OnErrorCallback<TError>
  ) {
    try {
      const { data } = await AuthApi.resetSession();

      this.setAccessToken(data.accessToken);
      this.setUser(data.user);

      AccessTokenApi.setToken(data.accessToken);

      if (onSuccess) onSuccess(data);
    } catch (error) {
      const errorResponse = (error as AxiosError<TError>).response!.data;

      if (onError) onError(errorResponse);
    }
  }

  async logOut() {
    try {
      await AuthApi.logOut();

      this.user = null;
      this.accessToken = null;
    } catch (err) {}
  }
}
