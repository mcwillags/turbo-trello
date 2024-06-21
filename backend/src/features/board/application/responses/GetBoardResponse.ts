import { BoardDto } from "~features/board/application/dto/BoardDto";

export class GetBoardResponse {
  constructor(public readonly board: BoardDto) {}
}
