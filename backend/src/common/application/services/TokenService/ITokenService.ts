import { IUserPayload } from "~common/application/interfaces/IUserPayload";

export interface ITokenService {
  createAccessToken(dto: IUserPayload): string;

  createRefreshToken(dto: IUserPayload): string;

  validateSync(token: string): void;

  decode(token: string): IUserPayload;
}
