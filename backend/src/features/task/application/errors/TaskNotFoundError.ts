import { BadRequestException } from "@nestjs/common";

export class TaskNotFoundError extends BadRequestException {
  constructor(message: string = "Task with such id was not found") {
    super({ message });
  }
}
