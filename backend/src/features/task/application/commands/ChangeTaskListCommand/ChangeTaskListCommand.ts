import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { ListNotFoundError } from "~features/list/application/errors/ListNotFoundError";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { ListRepositoryToken } from "~features/list/diTokens";
import { IChangeTaskListCommand } from "~features/task/application/commands/ChangeTaskListCommand/IChangeTaskListCommand";
import { ChangeTaskListDto } from "~features/task/application/dto/ChangeTaskListDto";
import { TaskNotFoundError } from "~features/task/application/errors/TaskNotFoundError";
import { ITaskRepository } from "~features/task/application/interfaces/ITaskRepository";
import { TaskMapper } from "~features/task/application/mappers/TaskMapper";
import { ChangeTaskListResponse } from "~features/task/application/responses/ChangeTaskListResponse";
import { TaskRepositoryToken } from "~features/task/diTokents";

@Injectable({ scope: Scope.REQUEST })
export class ChangeTaskListCommand implements IChangeTaskListCommand {
  @Inject(TaskRepositoryToken.TASK_REPOSITORY)
  private _taskRepository: ITaskRepository;

  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  async execute(dto: ChangeTaskListDto): Promise<ChangeTaskListResponse> {
    const list = await this._listRepository.getById(dto.listId);

    if (!list) throw new ListNotFoundError();

    if (list.userId !== dto.userId) throw new ForbiddenError();

    const task = await this._taskRepository.getById(dto.id);

    if (!task) throw new TaskNotFoundError();

    if (task.userId !== dto.userId) throw new ForbiddenError();

    const updatedTask = await this._taskRepository.changeList(dto.id, {
      listId: dto.listId,
    });

    return new ChangeTaskListResponse(TaskMapper.toDto(updatedTask));
  }
}
