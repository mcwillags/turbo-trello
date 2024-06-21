import { BoardDto } from "~features/board/application/dto/BoardDto";

export class CreateBoardResponse {
  constructor(public readonly board: BoardDto) {}
}
