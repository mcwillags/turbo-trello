import { Inject, Injectable, Scope } from "@nestjs/common";

import { ITokenService } from "~common/application/services/TokenService/ITokenService";
import { CommonServiceToken } from "~common/diTokens";
import { IRefreshTokenCommand } from "~features/auth/application/commands/Token/IRefreshTokenCommand";
import { RefreshTokenDto } from "~features/auth/application/dto/RefreshTokenDto";
import { RefreshTokenResponse } from "~features/auth/application/responses/RefreshTokenResponse";
import { IAuthService } from "~features/auth/application/services/AuthService/IAuthService";
import { AuthServiceToken } from "~features/auth/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class RefreshTokenCommand implements IRefreshTokenCommand {
  @Inject(CommonServiceToken.TOKEN_SERVICE)
  private _tokenService: ITokenService;

  @Inject(AuthServiceToken.AUTH_SERVICE)
  private _authService: IAuthService;

  async execute(request: RefreshTokenDto): Promise<RefreshTokenResponse> {
    this._tokenService.validateSync(request.token);

    const userPayload = this._tokenService.decode(request.token);

    const user = await this._authService.getUserByEmail(userPayload.email);

    const accessToken = this._tokenService.createAccessToken(user);

    return new RefreshTokenResponse(accessToken);
  }
}
