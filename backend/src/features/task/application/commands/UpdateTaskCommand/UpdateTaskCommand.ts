import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { UpdateListDto } from "~features/list/application/dto/UpdateListDto";
import { IUpdateTaskCommand } from "~features/task/application/commands/UpdateTaskCommand/IUpdateTaskCommand";
import { TaskNotFoundError } from "~features/task/application/errors/TaskNotFoundError";
import { ITaskRepository } from "~features/task/application/interfaces/ITaskRepository";
import { TaskMapper } from "~features/task/application/mappers/TaskMapper";
import { UpdateTaskResponse } from "~features/task/application/responses/UpdateTaskResponse";
import { TaskRepositoryToken } from "~features/task/diTokents";

@Injectable({ scope: Scope.REQUEST })
export class UpdateTaskCommand implements IUpdateTaskCommand {
  @Inject(TaskRepositoryToken.TASK_REPOSITORY)
  private _taskRepository: ITaskRepository;

  async execute(dto: UpdateListDto): Promise<UpdateTaskResponse> {
    const task = await this._taskRepository.getById(dto.id);

    if (!task) throw new TaskNotFoundError();

    if (task.userId !== dto.userId) throw new ForbiddenError();

    const updatedTask = await this._taskRepository.update(dto.id, {
      title: dto.title,
    });

    return new UpdateTaskResponse(TaskMapper.toDto(updatedTask));
  }
}
