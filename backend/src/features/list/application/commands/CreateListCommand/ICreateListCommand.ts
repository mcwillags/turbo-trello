import { ICommand } from "~common/application/interfaces/ICommand";
import { CreateListDto } from "~features/list/application/dto/CreateListDto";
import { CreateListResponse } from "~features/list/application/responses/CreateListResponse";

export abstract class ICreateListCommand extends ICommand<CreateListDto, CreateListResponse> {}
