import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { GetTaskDto } from "~features/task/application/dto/GetTaskDto";
import { TaskNotFoundError } from "~features/task/application/errors/TaskNotFoundError";
import { ITaskRepository } from "~features/task/application/interfaces/ITaskRepository";
import { TaskMapper } from "~features/task/application/mappers/TaskMapper";
import { IGetTaskQuery } from "~features/task/application/queries/GetTaskQuery/IGetTaskQuery";
import { GetTaskRepsonse } from "~features/task/application/responses/GetTaskRepsonse";
import { TaskRepositoryToken } from "~features/task/diTokents";

@Injectable({ scope: Scope.REQUEST })
export class GetTaskQuery implements IGetTaskQuery {
  @Inject(TaskRepositoryToken.TASK_REPOSITORY)
  private _taskRepository: ITaskRepository;

  async execute(dto: GetTaskDto): Promise<GetTaskRepsonse> {
    const task = await this._taskRepository.getById(dto.id);

    if (!task) throw new TaskNotFoundError();

    if (task.userId !== dto.userId) throw new ForbiddenError();

    return new GetTaskRepsonse(TaskMapper.toDto(task));
  }
}
