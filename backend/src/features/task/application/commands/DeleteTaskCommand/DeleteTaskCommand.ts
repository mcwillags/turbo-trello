import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { IDeleteTaskCommand } from "~features/task/application/commands/DeleteTaskCommand/IDeleteTaskCommand";
import { DeleteTaskDto } from "~features/task/application/dto/DeleteTaskDto";
import { TaskNotFoundError } from "~features/task/application/errors/TaskNotFoundError";
import { ITaskRepository } from "~features/task/application/interfaces/ITaskRepository";
import { DeleteTaskResponse } from "~features/task/application/responses/DeleteTaskResponse";
import { TaskRepositoryToken } from "~features/task/diTokents";

@Injectable({ scope: Scope.REQUEST })
export class DeleteTaskCommand implements IDeleteTaskCommand {
  @Inject(TaskRepositoryToken.TASK_REPOSITORY)
  private _taskRepository: ITaskRepository;

  async execute(dto: DeleteTaskDto): Promise<DeleteTaskResponse> {
    const task = await this._taskRepository.getById(dto.id);

    if (!task) throw new TaskNotFoundError();

    if (task.userId !== dto.userId) throw new ForbiddenError();

    await this._taskRepository.delete(task.id);

    return new DeleteTaskResponse().withMessage("List was deleted successfully");
  }
}
