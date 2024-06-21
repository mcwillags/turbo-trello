import { ICommand } from "~common/application/interfaces/ICommand";
import { CreateTaskDto } from "~features/task/application/dto/CreateTaskDto";
import { CreateTaskResponse } from "~features/task/application/responses/CreateTaskResponse";

export abstract class ICreateTaskCommand extends ICommand<CreateTaskDto, CreateTaskResponse> {}
