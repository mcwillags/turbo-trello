import { IUserPayload } from "~common/application/interfaces/IUserPayload";

export class LoginUserResponse {
  constructor(
    public readonly user: IUserPayload,
    public readonly accessToken: string,
    public readonly refreshToken: string
  ) {}
}
