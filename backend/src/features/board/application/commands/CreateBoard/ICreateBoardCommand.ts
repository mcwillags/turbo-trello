import { ICommand } from "~common/application/interfaces/ICommand";
import { CreateBoardDto } from "~features/board/application/dto/CreateBoardDto";
import { CreateBoardResponse } from "~features/board/application/responses/CreateBoardResponse";

export abstract class ICreateBoardCommand extends ICommand<CreateBoardDto, CreateBoardResponse> {}
