import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { IUserPayload } from "~common/application/interfaces/IUserPayload";
import { TokenConfig } from "~config/TokenConfig";
import { User } from "~features/user/domain/UserEntity";

import { ITokenService } from "./ITokenService";

@Injectable()
export class TokenService implements ITokenService {
  constructor(private jwtService: JwtService) {}

  private createJwtPayload(dto: User): IUserPayload {
    return {
      id: dto.id,
      email: dto.email,
    };
  }

  createAccessToken(dto: User): string {
    const payload = this.createJwtPayload(dto);

    return this.jwtService.sign(payload, { expiresIn: TokenConfig.accessTokenExpireTime });
  }

  createRefreshToken(dto: User): string {
    const payload = this.createJwtPayload(dto);

    return this.jwtService.sign(payload, { expiresIn: TokenConfig.refreshTokenExpireTime });
  }

  validateSync(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException({ message: "Unauthorized" });
    }
  }

  decode(token: string): IUserPayload {
    return this.jwtService.decode(token);
  }
}
