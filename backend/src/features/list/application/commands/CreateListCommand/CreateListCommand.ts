import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { BoardNotFoundError } from "~features/board/application/errors/BoardNotFoundError";
import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { BoardRepositoryToken } from "~features/board/diTokens";
import { ICreateListCommand } from "~features/list/application/commands/CreateListCommand/ICreateListCommand";
import { CreateListDto } from "~features/list/application/dto/CreateListDto";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { CreateListResponse } from "~features/list/application/responses/CreateListResponse";
import { ListRepositoryToken } from "~features/list/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class CreateListCommand implements ICreateListCommand {
  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  @Inject(BoardRepositoryToken.BOARD_REPOSITORY)
  private _boardRepository: IBoardRepository;

  async execute(dto: CreateListDto): Promise<CreateListResponse> {
    const board = await this._boardRepository.getById(dto.boardId);

    if (!board) throw new BoardNotFoundError();

    if (board.userId !== dto.userId) throw new ForbiddenError();

    const newList = await this._listRepository.create({
      title: dto.title,
      userId: dto.userId,
      boardId: dto.boardId,
    });

    return new CreateListResponse(ListMapper.toDto(newList));
  }
}
