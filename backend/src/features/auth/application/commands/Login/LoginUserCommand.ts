import { Inject, Injectable, Scope } from "@nestjs/common";

import { ITokenService } from "~common/application/services/TokenService/ITokenService";
import { CommonServiceToken } from "~common/diTokens";
import { ILoginUserCommand } from "~features/auth/application/commands/Login/ILoginUserCommand";
import { LoginDto } from "~features/auth/application/dto/LoginDto";
import { LoginUserResponse } from "~features/auth/application/responses/LoginUserResponse";
import { IAuthService } from "~features/auth/application/services/AuthService/IAuthService";
import { AuthServiceToken } from "~features/auth/diTokens";
import { UserMapper } from "~features/user/application/mappers/UserMapper";

@Injectable({ scope: Scope.REQUEST })
export class LoginUserCommand implements ILoginUserCommand {
  @Inject(AuthServiceToken.AUTH_SERVICE)
  private _authService: IAuthService;

  @Inject(CommonServiceToken.TOKEN_SERVICE)
  private _tokenService: ITokenService;

  async execute(request: LoginDto): Promise<LoginUserResponse> {
    const user = await this._authService.getUserByEmail(request.email);

    await this._authService.validateLoginAttempt(user, request);

    const accessToken = this._tokenService.createAccessToken(user);
    const refreshToken = this._tokenService.createRefreshToken(user);

    const userDto = UserMapper.toDto(user);

    return new LoginUserResponse(userDto, accessToken, refreshToken);
  }
}
