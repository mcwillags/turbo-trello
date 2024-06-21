import { BadRequestException } from "@nestjs/common";

export class ListNotFoundError extends BadRequestException {
  constructor(message: string = "List with such id was not found") {
    super({ message });
  }
}
