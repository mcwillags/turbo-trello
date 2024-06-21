import { Module } from "@nestjs/common";

import { CommonModule } from "~common/CommonModule";
import { ListModule } from "~features/list/ListModule";
import { ChangeTaskListCommand } from "~features/task/application/commands/ChangeTaskListCommand/ChangeTaskListCommand";
import { CreateTaskCommand } from "~features/task/application/commands/CreateTaskCommand/CreateTaskCommand";
import { DeleteTaskCommand } from "~features/task/application/commands/DeleteTaskCommand/DeleteTaskCommand";
import { UpdateTaskCommand } from "~features/task/application/commands/UpdateTaskCommand/UpdateTaskCommand";
import { GetTaskQuery } from "~features/task/application/queries/GetTaskQuery/GetTaskQuery";
import { GetTasksQuery } from "~features/task/application/queries/GetTasksQuery/GetTasksQuery";
import { TaskCommandToken, TaskQueryToken, TaskRepositoryToken } from "~features/task/diTokents";
import { TaskRepository } from "~features/task/infrastructure/TaskRepository";
import { TaskController } from "~features/task/presentation/TaskController";
import { PrismaModule } from "~prisma/PrismaModule";
import { createProvider } from "~utils/functions/createProvider";

@Module({
  imports: [PrismaModule, ListModule, CommonModule],
  controllers: [TaskController],
  providers: [
    createProvider(TaskRepositoryToken.TASK_REPOSITORY, TaskRepository),
    createProvider(TaskCommandToken.CREATE_TASK_COMMAND, CreateTaskCommand),
    createProvider(TaskCommandToken.CHANGE_TASK_LIST_COMMAND, ChangeTaskListCommand),
    createProvider(TaskCommandToken.DELETE_TASK_COMMAND, DeleteTaskCommand),
    createProvider(TaskCommandToken.UPDATE_TASK_COMMAND, UpdateTaskCommand),
    createProvider(TaskQueryToken.GET_TASK_QUERY, GetTaskQuery),
    createProvider(TaskQueryToken.GET_TASKS_QUERY, GetTasksQuery),
  ],
})
export class TaskModule {}
