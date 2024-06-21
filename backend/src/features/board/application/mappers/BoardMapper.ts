import { Board as IBoard } from "@prisma/client";

import { Board } from "../../domain/BoardEntity";
import { BoardDto } from "~features/board/application/dto/BoardDto";

export class BoardMapper {
  static toEntity(initialData: IBoard): Board {
    const { id, title, userId, createdAt, updatedAt } = initialData;

    return new Board(id, title, userId, createdAt, updatedAt);
  }

  static toDto(entity: Board): BoardDto {
    const { id, title, createdAt, updatedAt } = entity;

    return new BoardDto(id, title, createdAt, updatedAt);
  }
}
