import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { IUpdateBoardCommand } from "~features/board/application/commands/UpdateBoard/IUpdateBoardCommand";
import { UpdateBoardDto } from "~features/board/application/dto/UpdateBoardDto";
import { BoardNotFoundError } from "~features/board/application/errors/BoardNotFoundError";
import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { UpdateBoardResponse } from "~features/board/application/responses/UpdateBoardResponse";
import { BoardRepositoryToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class UpdateBoardCommand implements IUpdateBoardCommand {
  @Inject(BoardRepositoryToken.BOARD_REPOSITORY)
  private _boardRepository: IBoardRepository;

  async execute(dto: UpdateBoardDto): Promise<UpdateBoardResponse> {
    const board = await this._boardRepository.getById(dto.id);

    if (!board) throw new BoardNotFoundError();

    if (board.userId !== dto.userId) throw new ForbiddenError();

    const updatedBoard = await this._boardRepository.update(board.id, { title: dto.title });

    return new UpdateBoardResponse(BoardMapper.toDto(updatedBoard));
  }
}
