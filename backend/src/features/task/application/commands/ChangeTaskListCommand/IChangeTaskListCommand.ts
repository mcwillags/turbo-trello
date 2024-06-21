import { ICommand } from "~common/application/interfaces/ICommand";
import { ChangeTaskListDto } from "~features/task/application/dto/ChangeTaskListDto";
import { ChangeTaskListResponse } from "~features/task/application/responses/ChangeTaskListResponse";

export abstract class IChangeTaskListCommand extends ICommand<ChangeTaskListDto, ChangeTaskListResponse> {}
