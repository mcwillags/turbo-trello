import { BoardDto } from "~features/board/application/dto/BoardDto";

export class UpdateBoardResponse {
  constructor(public readonly board: BoardDto) {}
}
