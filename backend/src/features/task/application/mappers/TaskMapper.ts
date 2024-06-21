import { Task as ITask } from "@prisma/client";

import { Task } from "../../domain/TaskEntity";
import { TaskDto } from "~features/task/application/dto/TaskDto";

export class TaskMapper {
  static toEntity(initialData: ITask): Task {
    const { id, userId, listId, title, createdAt, updatedAt } = initialData;

    return new Task(id, userId, listId, title, createdAt, updatedAt);
  }

  static toDto(entity: Task): TaskDto {
    const { id, listId, title, createdAt, updatedAt } = entity;

    return new TaskDto(id, listId, title, createdAt, updatedAt);
  }
}
