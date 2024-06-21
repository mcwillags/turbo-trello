import { BadRequestException } from "@nestjs/common";

export class EmailInUseError extends BadRequestException {
  constructor(message: string = "Email is already in use") {
    super({ message });
  }
}