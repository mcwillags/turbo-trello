import { Inject, Injectable, Scope } from "@nestjs/common";

import { ICreateBoardCommand } from "~features/board/application/commands/CreateBoard/ICreateBoardCommand";
import { CreateBoardDto } from "~features/board/application/dto/CreateBoardDto";
import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { CreateBoardResponse } from "~features/board/application/responses/CreateBoardResponse";
import { BoardRepositoryToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class CreateBoardCommand implements ICreateBoardCommand {
  @Inject(BoardRepositoryToken.BOARD_REPOSITORY)
  private _boardRepository: IBoardRepository;

  async execute(dto: CreateBoardDto): Promise<CreateBoardResponse> {
    const newBoard = await this._boardRepository.create({
      title: dto.title,
      userId: dto.userId,
    });

    return new CreateBoardResponse(BoardMapper.toDto(newBoard));
  }
}
