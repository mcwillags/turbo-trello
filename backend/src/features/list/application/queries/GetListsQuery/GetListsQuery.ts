import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { BoardNotFoundError } from "~features/board/application/errors/BoardNotFoundError";
import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { BoardRepositoryToken } from "~features/board/diTokens";
import { GetListsDto } from "~features/list/application/dto/GetListsDto";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { IGetListsQuery } from "~features/list/application/queries/GetListsQuery/IGetListsQuery";
import { GetListsResponse } from "~features/list/application/responses/GetListsResponse";
import { ListRepositoryToken } from "~features/list/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class GetListsQuery implements IGetListsQuery {
  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  @Inject(BoardRepositoryToken.BOARD_REPOSITORY)
  private _boardRepository: IBoardRepository;

  async execute(dto: GetListsDto): Promise<GetListsResponse> {
    const board = await this._boardRepository.getById(dto.boardId);

    if (!board) throw new BoardNotFoundError();

    if (board.userId !== dto.userId) throw new ForbiddenError();

    const lists = await this._listRepository.getManyByBoardId(dto.boardId);

    return new GetListsResponse(lists.map(ListMapper.toDto));
  }
}
