import { Inject, Injectable, Scope } from "@nestjs/common";

import { GetBoardsDto } from "~features/board/application/dto/GetBoardsDto";
import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { IGetBoardsQuery } from "~features/board/application/queries/BoardsQuery/IGetBoardsQuery";
import { GetBoardsResponse } from "~features/board/application/responses/GetBoardsResponse";
import { BoardRepositoryToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class GetBoardsQuery implements IGetBoardsQuery {
  @Inject(BoardRepositoryToken.BOARD_REPOSITORY)
  private _boardRepository: IBoardRepository;

  async execute(dto: GetBoardsDto): Promise<GetBoardsResponse> {
    const boards = await this._boardRepository.getManyByUserId(dto.userId);

    return new GetBoardsResponse(boards.map(BoardMapper.toDto));
  }
}
