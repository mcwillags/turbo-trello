import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";

import { IUserPayload } from "~common/application/interfaces/IUserPayload";
import { TokenGuard } from "~common/guards/TokenGuard";
import { RequestParams } from "~common/presentation/RequestParams";
import { ICreateBoardCommand } from "~features/board/application/commands/CreateBoard/ICreateBoardCommand";
import { IDeleteBoardCommand } from "~features/board/application/commands/DeleteBoard/IDeleteBoardCommand";
import { IUpdateBoardCommand } from "~features/board/application/commands/UpdateBoard/IUpdateBoardCommand";
import { IGetBoardQuery } from "~features/board/application/queries/BoardQuery/IGetBoardQuery";
import { IGetBoardsQuery } from "~features/board/application/queries/BoardsQuery/IGetBoardsQuery";
import { CreateBoardRequest } from "~features/board/application/requests/CreateBoardRequest";
import { UpdateBoardRequest } from "~features/board/application/requests/UpdateBoardRequest";
import { BoardCommandToken, BoardQueryToken } from "~features/board/diTokens";
import { TokenPayload } from "~utils/decorators/TokenPayloadDecorator";

@UseGuards(TokenGuard)
@Controller("/boards")
export class BoardController {
  @Inject(BoardCommandToken.CREATE_BOARD_COMMAND)
  private _createBoardCommand: ICreateBoardCommand;

  @Inject(BoardCommandToken.UPDATE_BOARD_COMMAND)
  private _updateBoardCommand: IUpdateBoardCommand;

  @Inject(BoardCommandToken.DELETE_BOARD_COMMAND)
  private _deleteBoardCommand: IDeleteBoardCommand;

  @Inject(BoardQueryToken.GET_BOARD_QUERY)
  private _getBoardQuery: IGetBoardQuery;

  @Inject(BoardQueryToken.GET_BOARDS_QUERY)
  private _getBoardsQuery: IGetBoardsQuery;

  @Post()
  async createBoard(@Body() body: CreateBoardRequest, @TokenPayload() user: IUserPayload) {
    return await this._createBoardCommand.execute({
      title: body.title,
      userId: user.id,
    });
  }

  @Put("/:id")
  async updateBoard(
    @Param() params: RequestParams,
    @Body() body: UpdateBoardRequest,
    @TokenPayload() user: IUserPayload
  ) {
    return await this._updateBoardCommand.execute({
      id: Number(params.id),
      title: body.title,
      userId: user.id,
    });
  }

  @Delete("/:id")
  async deleteBoard(@Param() params: RequestParams, @TokenPayload() user: IUserPayload) {
    return await this._deleteBoardCommand.execute({
      id: Number(params.id),
      userId: user.id,
    });
  }

  @Get("/:id")
  async getBoard(@Param() params: RequestParams, @TokenPayload() user: IUserPayload) {
    return await this._getBoardQuery.execute({
      id: Number(params.id),
      userId: user.id,
    });
  }

  @Post("/get")
  async getBoards(@TokenPayload() user: IUserPayload) {
    return await this._getBoardsQuery.execute({
      userId: user.id,
    });
  }
}
