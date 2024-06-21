import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { TokenConfig } from "~config/TokenConfig";
import { ILoginUserCommand } from "~features/auth/application/commands/Login/ILoginUserCommand";
import { IResetSessionCommand } from "~features/auth/application/commands/ResetSessionCommand/IResetSessionCommand";
import { IRefreshTokenCommand } from "~features/auth/application/commands/Token/IRefreshTokenCommand";
import { LoginUserRequest } from "~features/auth/application/requests/LoginUserRequest";
import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";
import { LoginUserResponse } from "~features/auth/application/responses/LoginUserResponse";
import { RefreshTokenResponse } from "~features/auth/application/responses/RefreshTokenResponse";
import { RegisterUserResponse } from "~features/auth/application/responses/RegisterUserResponse";
import { AuthCommandToken } from "~features/auth/diTokens";
import { ICreateUserCommand } from "~features/user/application/commands/ICreateUserCommand";
import { UserCommandToken } from "~features/user/diTokens";
import { Cookies } from "~utils/decorators/CookieDecorator";

@Controller("/auth")
export class AuthController {
  @Inject(UserCommandToken.CREATE_USER_COMMAND)
  private _createUserCommand: ICreateUserCommand;

  @Inject(AuthCommandToken.LOGIN_USER_COMMAND)
  private _loginUserCommand: ILoginUserCommand;

  @Inject(AuthCommandToken.REFRESH_TOKEN_COMMAND)
  private _refreshTokenCommand: IRefreshTokenCommand;

  @Inject(AuthCommandToken.RESET_SESSION_COMMAND)
  private _resetSessionCommand: IResetSessionCommand;

  @Post("/register")
  async register(@Body() body: RegisterUserRequest): Promise<RegisterUserResponse> {
    return await this._createUserCommand.execute(body);
  }

  @Post("/login")
  async login(
    @Body() body: LoginUserRequest,
    @Res({ passthrough: true }) response: Response
  ): Promise<Omit<LoginUserResponse, "refreshToken">> {
    const { refreshToken, accessToken, user } = await this._loginUserCommand.execute(body);

    response.cookie(TokenConfig.cookieTokenKey, refreshToken);

    return {
      user,
      accessToken,
    };
  }

  @Post("/refresh")
  async refreshAccessToken(@Cookies(TokenConfig.cookieTokenKey) refreshToken: string): Promise<RefreshTokenResponse> {
    return await this._refreshTokenCommand.execute({
      token: refreshToken,
    });
  }

  @Post("/reset-session")
  async resetSession(@Cookies(TokenConfig.cookieTokenKey) refreshToken: string) {
    return await this._resetSessionCommand.execute({
      refreshToken,
    });
  }

  @Post("/logout")
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(TokenConfig.cookieTokenKey);
  }
}
