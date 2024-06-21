import axios, { InternalAxiosRequestConfig } from "axios";

import { AccessTokenApi } from "../api/AccessTokenApi.ts";
import { AuthApi } from "../api/auth/AuthApi.ts";
import { ApiConstants } from "~constants/ApiConstants.ts";

export const appAxios = axios.create({
  withCredentials: true,
  baseURL: ApiConstants.API_URL,
});

appAxios.interceptors.request.use((config) => {
  config.headers.setAuthorization("Bearer " + AccessTokenApi.getToken());

  return config;
});

export const setupSilentRefresh = (onTokenRefresh: (token: string) => void, onSessionEnd: () => void) => {
  appAxios.interceptors.response.use(
    (config) => config,
    async (error) => {
      if (!(error.response.status === 401) || !error.config || error.config._isRetry) throw error;

      const originalRequest: InternalAxiosRequestConfig & { _isRetry?: boolean } = error.config;

      if (originalRequest.url === "auth/reset-session") throw error;

      originalRequest._isRetry = true;

      try {
        const { data } = await AuthApi.refreshToken();

        onTokenRefresh(data.accessToken);

        return appAxios.request(originalRequest);
      } catch (error) {
        onSessionEnd();
      }
    }
  );
};
