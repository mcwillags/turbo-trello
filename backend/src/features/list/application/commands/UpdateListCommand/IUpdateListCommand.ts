import { ICommand } from "~common/application/interfaces/ICommand";
import { UpdateListDto } from "~features/list/application/dto/UpdateListDto";
import { UpdateListResponse } from "~features/list/application/responses/UpdateListResponse";

export abstract class IUpdateListCommand extends ICommand<UpdateListDto, UpdateListResponse> {}