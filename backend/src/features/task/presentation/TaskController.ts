import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";

import { IUserPayload } from "~common/application/interfaces/IUserPayload";
import { TokenGuard } from "~common/guards/TokenGuard";
import { RequestParams } from "~common/presentation/RequestParams";
import { IChangeTaskListCommand } from "~features/task/application/commands/ChangeTaskListCommand/IChangeTaskListCommand";
import { ICreateTaskCommand } from "~features/task/application/commands/CreateTaskCommand/ICreateTaskCommand";
import { IDeleteTaskCommand } from "~features/task/application/commands/DeleteTaskCommand/IDeleteTaskCommand";
import { IUpdateTaskCommand } from "~features/task/application/commands/UpdateTaskCommand/IUpdateTaskCommand";
import { IGetTaskQuery } from "~features/task/application/queries/GetTaskQuery/IGetTaskQuery";
import { IGetTasksQuery } from "~features/task/application/queries/GetTasksQuery/IGetTasksQuery";
import { ChangeTaskListRequest } from "~features/task/application/requests/ChangeTaskListRequest";
import { CreateTaskRequest } from "~features/task/application/requests/CreateTaskRequest";
import { GetTasksRequest } from "~features/task/application/requests/GetTasksRequest";
import { UpdateTaskRequest } from "~features/task/application/requests/UpdateTaskRequest";
import { TaskCommandToken, TaskQueryToken } from "~features/task/diTokents";
import { TokenPayload } from "~utils/decorators/TokenPayloadDecorator";

@UseGuards(TokenGuard)
@Controller("/tasks")
export class TaskController {
  @Inject(TaskCommandToken.CREATE_TASK_COMMAND)
  private _createTaskCommand: ICreateTaskCommand;

  @Inject(TaskCommandToken.UPDATE_TASK_COMMAND)
  private _updateTaskCommand: IUpdateTaskCommand;

  @Inject(TaskCommandToken.CHANGE_TASK_LIST_COMMAND)
  private _changeTaskListCommand: IChangeTaskListCommand;

  @Inject(TaskCommandToken.DELETE_TASK_COMMAND)
  private _deleteTaskCommand: IDeleteTaskCommand;

  @Inject(TaskQueryToken.GET_TASK_QUERY)
  private _getTaskQuery: IGetTaskQuery;

  @Inject(TaskQueryToken.GET_TASKS_QUERY)
  private _getTasksQuery: IGetTasksQuery;

  @Post()
  async createTask(@Body() body: CreateTaskRequest, @TokenPayload() user: IUserPayload) {
    return await this._createTaskCommand.execute({
      title: body.title,
      listId: body.listId,
      userId: user.id,
    });
  }

  @Put("/:id")
  async updateTask(
    @Param() params: RequestParams,
    @Body() body: UpdateTaskRequest,
    @TokenPayload() user: IUserPayload
  ) {
    return await this._updateTaskCommand.execute({
      id: Number(params.id),
      title: body.title,
      userId: user.id,
    });
  }

  @Patch("/:id")
  async changeTaskList(
    @Param() params: RequestParams,
    @Body() body: ChangeTaskListRequest,
    @TokenPayload() user: IUserPayload
  ) {
    return await this._changeTaskListCommand.execute({
      id: Number(params.id),
      listId: body.listId,
      userId: user.id,
    });
  }

  @Delete("/:id")
  async deleteTask(@Param() params: RequestParams, @TokenPayload() user: IUserPayload) {
    return await this._deleteTaskCommand.execute({
      id: Number(params.id),
      userId: user.id,
    });
  }

  @Get("/:id")
  async getTask(@Param() params: RequestParams, @TokenPayload() user: IUserPayload) {
    return await this._getTaskQuery.execute({
      id: Number(params.id),
      userId: user.id,
    });
  }

  @Post("/get")
  async getTasks(@Body() body: GetTasksRequest, @TokenPayload() user: IUserPayload) {
    return await this._getTasksQuery.execute({
      listId: body.listId,
      userId: user.id,
    });
  }
}
