import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { GetBoardDto } from "~features/board/application/dto/GetBoardDto";
import { BoardNotFoundError } from "~features/board/application/errors/BoardNotFoundError";
import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { IGetBoardQuery } from "~features/board/application/queries/BoardQuery/IGetBoardQuery";
import { GetBoardResponse } from "~features/board/application/responses/GetBoardResponse";
import { BoardRepositoryToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class GetBoardQuery implements IGetBoardQuery {
  @Inject(BoardRepositoryToken.BOARD_REPOSITORY)
  private _boardRepository: IBoardRepository;

  async execute(dto: GetBoardDto): Promise<GetBoardResponse> {
    const board = await this._boardRepository.getById(dto.id);

    if (!board) throw new BoardNotFoundError();

    if (board.userId !== dto.userId) throw new ForbiddenError();

    return new GetBoardResponse(BoardMapper.toDto(board));
  }
}
