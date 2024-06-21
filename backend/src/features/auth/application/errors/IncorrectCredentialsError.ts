import { BadRequestException } from "@nestjs/common";


export class IncorrectCredentialsError extends BadRequestException {
  constructor(message: string = "Email or password is incorrect") {
    super({ message });
  }
}