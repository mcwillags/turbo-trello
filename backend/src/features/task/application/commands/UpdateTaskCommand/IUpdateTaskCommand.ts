import { ICommand } from "~common/application/interfaces/ICommand";
import { UpdateTaskDto } from "~features/task/application/dto/UpdateTaskDto";
import { UpdateTaskResponse } from "~features/task/application/responses/UpdateTaskResponse";

export abstract class IUpdateTaskCommand extends ICommand<UpdateTaskDto, UpdateTaskResponse> {}
