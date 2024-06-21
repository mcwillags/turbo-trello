import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";

import { ITokenService } from "../application/services/TokenService/ITokenService";
import { CommonServiceToken } from "../diTokens";

type AuthorizedRequest = Request & {
  headers: Request["headers"] & {
    authorization: string;
  };
};

@Injectable()
export class TokenGuard implements CanActivate {
  @Inject(CommonServiceToken.TOKEN_SERVICE)
  private _tokenService: ITokenService;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException({ message: "Unauthorized" });

    this._tokenService.validateSync(token);

    request["user"] = this._tokenService.decode(token);

    return true;
  }

  private extractTokenFromHeader(request: AuthorizedRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
