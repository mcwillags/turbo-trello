import { ICommand } from "~common/application/interfaces/ICommand";
import { DeleteTaskDto } from "~features/task/application/dto/DeleteTaskDto";
import { DeleteTaskResponse } from "~features/task/application/responses/DeleteTaskResponse";

export abstract class IDeleteTaskCommand extends ICommand<DeleteTaskDto, DeleteTaskResponse> {}
