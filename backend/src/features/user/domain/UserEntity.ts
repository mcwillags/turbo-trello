import { BaseEntity } from "~common/domain/BaseEntity";
import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";

export class User extends BaseEntity {
  private readonly _loginAttempt: LoginAttempt;

  constructor(
    id: number,
    public readonly email: string,
    public readonly password: string,
    unsuccessfulLoginAttemptsCount: number,
    banStartTime: Date
  ) {
    super(id);

    this._loginAttempt = new LoginAttempt(unsuccessfulLoginAttemptsCount, banStartTime);
  }

  get unsuccessfulLoginAttemptsCount(): number {
    return this._loginAttempt.unsuccessfulLoginAttemptsCount;
  }

  get banStartTime(): Date {
    return this._loginAttempt.banStartTime;
  }
}
