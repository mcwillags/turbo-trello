import { ForbiddenException } from "@nestjs/common";


export class LoginRestrictedError extends ForbiddenException {
  constructor(message: string, banTimeRemaining: number) {
    super({ message, banTimeRemaining });
  }
}
