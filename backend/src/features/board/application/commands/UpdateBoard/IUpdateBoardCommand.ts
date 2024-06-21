import { ICommand } from "~common/application/interfaces/ICommand";
import { UpdateBoardDto } from "~features/board/application/dto/UpdateBoardDto";
import { UpdateBoardResponse } from "~features/board/application/responses/UpdateBoardResponse";

export abstract class IUpdateBoardCommand extends ICommand<UpdateBoardDto, UpdateBoardResponse> {}
