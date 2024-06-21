import { BadRequestException } from "@nestjs/common";

export class BoardNotFoundError extends BadRequestException {
  constructor(message: string = "Board with such id was not found") {
    super({ message });
  }
}
