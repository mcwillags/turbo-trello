import { IUserPayload } from "~common/application/interfaces/IUserPayload";

export class ResetSessionResponse {
  constructor(
    public user: IUserPayload,
    public accessToken: string
  ) {}
}