import { ICommand } from "~common/application/interfaces/ICommand";
import { DeleteListDto } from "~features/list/application/dto/DeleteListDto";
import { DeleteListResponse } from "~features/list/application/responses/DeleteListResponse";

export abstract class IDeleteListCommand extends ICommand<DeleteListDto, DeleteListResponse> {}