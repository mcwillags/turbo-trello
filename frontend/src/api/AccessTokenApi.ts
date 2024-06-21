import { TokenConstants } from "~constants/TokenConstants.ts";
import { LocalStorageService } from "~utils/LocalStorageService.ts";

export class AccessTokenApi {
  private static readonly _localStorageService = new LocalStorageService<string>(TokenConstants.ACCESS_TOKEN_KEY);

  static setToken(token: string): void {
    this._localStorageService.setItem(token);
  }

  static getToken(): string | null {
    return this._localStorageService.getItem();
  }

  static removeToken(): void {
    this._localStorageService.removeItem();
  }
}
