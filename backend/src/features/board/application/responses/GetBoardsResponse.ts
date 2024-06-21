import { BoardDto } from "~features/board/application/dto/BoardDto";

export class GetBoardsResponse {
  constructor(public readonly boards: BoardDto[]) {}
}
