import { ForbiddenException } from "@nestjs/common";

export class ForbiddenError extends ForbiddenException {
  constructor(message: string = "Forbidden") {
    super({ message });
  }
}
