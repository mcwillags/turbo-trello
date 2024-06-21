import { Inject, Injectable, Scope } from "@nestjs/common";

import { ITokenService } from "~common/application/services/TokenService/ITokenService";
import { CommonServiceToken } from "~common/diTokens";
import { IResetSessionCommand } from "~features/auth/application/commands/ResetSessionCommand/IResetSessionCommand";
import { ResetSessionDto } from "~features/auth/application/dto/ResetSessionDto";
import { ResetSessionResponse } from "~features/auth/application/responses/ResetSessionResponse";

@Injectable({ scope: Scope.REQUEST })
export class ResetSessionCommand implements IResetSessionCommand {
  @Inject(CommonServiceToken.TOKEN_SERVICE)
  private _tokenService: ITokenService;

  async execute(request: ResetSessionDto): Promise<ResetSessionResponse> {
    this._tokenService.validateSync(request.refreshToken);

    const userPayload = this._tokenService.decode(request.refreshToken);

    const accessToken = this._tokenService.createAccessToken(userPayload);

    return new ResetSessionResponse(userPayload, accessToken);
  }
}