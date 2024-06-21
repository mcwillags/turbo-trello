import { ICommand } from "~common/application/interfaces/ICommand";
import { DeleteBoardDto } from "~features/board/application/dto/DeleteBoardDto";
import { DeleteBoardResponse } from "~features/board/application/responses/DeleteBoardResponse";

export abstract class IDeleteBoardCommand extends ICommand<DeleteBoardDto, DeleteBoardResponse> {}
