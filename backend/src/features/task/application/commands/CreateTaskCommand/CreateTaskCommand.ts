import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { ListNotFoundError } from "~features/list/application/errors/ListNotFoundError";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { ListRepositoryToken } from "~features/list/diTokens";
import { ICreateTaskCommand } from "~features/task/application/commands/CreateTaskCommand/ICreateTaskCommand";
import { CreateTaskDto } from "~features/task/application/dto/CreateTaskDto";
import { ITaskRepository } from "~features/task/application/interfaces/ITaskRepository";
import { TaskMapper } from "~features/task/application/mappers/TaskMapper";
import { CreateTaskResponse } from "~features/task/application/responses/CreateTaskResponse";
import { TaskRepositoryToken } from "~features/task/diTokents";

@Injectable({ scope: Scope.REQUEST })
export class CreateTaskCommand implements ICreateTaskCommand {
  @Inject(TaskRepositoryToken.TASK_REPOSITORY)
  private _taskRepository: ITaskRepository;

  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  async execute(dto: CreateTaskDto): Promise<CreateTaskResponse> {
    const list = await this._listRepository.getById(dto.listId);

    if (!list) throw new ListNotFoundError();

    if (list.userId !== dto.userId) throw new ForbiddenError();

    const task = await this._taskRepository.create({
      title: dto.title,
      userId: dto.userId,
      listId: dto.listId,
    });

    return new CreateTaskResponse(TaskMapper.toDto(task));
  }
}
