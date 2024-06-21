import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { IDeleteBoardCommand } from "~features/board/application/commands/DeleteBoard/IDeleteBoardCommand";
import { DeleteBoardDto } from "~features/board/application/dto/DeleteBoardDto";
import { BoardNotFoundError } from "~features/board/application/errors/BoardNotFoundError";
import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { DeleteBoardResponse } from "~features/board/application/responses/DeleteBoardResponse";
import { BoardRepositoryToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class DeleteBoardCommand implements IDeleteBoardCommand {
  @Inject(BoardRepositoryToken.BOARD_REPOSITORY)
  private _boardRepository: IBoardRepository;

  async execute(dto: DeleteBoardDto): Promise<DeleteBoardResponse> {
    const board = await this._boardRepository.getById(dto.id);

    if (!board) throw new BoardNotFoundError();

    if (board.userId !== dto.userId) throw new ForbiddenError();

    await this._boardRepository.delete(board.id);

    return new DeleteBoardResponse().withMessage("Board was deleted successfully");
  }
}
