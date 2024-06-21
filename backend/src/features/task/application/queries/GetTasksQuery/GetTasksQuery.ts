import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { ListNotFoundError } from "~features/list/application/errors/ListNotFoundError";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { ListRepositoryToken } from "~features/list/diTokens";
import { GetTasksDto } from "~features/task/application/dto/GetTasksDto";
import { ITaskRepository } from "~features/task/application/interfaces/ITaskRepository";
import { TaskMapper } from "~features/task/application/mappers/TaskMapper";
import { IGetTasksQuery } from "~features/task/application/queries/GetTasksQuery/IGetTasksQuery";
import { GetTasksResponse } from "~features/task/application/responses/GetTasksResponse";
import { TaskRepositoryToken } from "~features/task/diTokents";

@Injectable({ scope: Scope.REQUEST })
export class GetTasksQuery implements IGetTasksQuery {
  @Inject(TaskRepositoryToken.TASK_REPOSITORY)
  private _taskRepository: ITaskRepository;

  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  async execute(dto: GetTasksDto): Promise<GetTasksResponse> {
    const list = await this._listRepository.getById(dto.listId);

    if (!list) throw new ListNotFoundError();

    if (list.userId !== dto.userId) throw new ForbiddenError();

    const tasks = await this._taskRepository.getManyByListId(dto.listId);

    return new GetTasksResponse(tasks.map(TaskMapper.toDto));
  }
}
