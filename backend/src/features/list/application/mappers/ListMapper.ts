import { List as IList } from "@prisma/client";

import { ListDto } from "~features/list/application/dto/ListDto";
import { List } from "~features/list/domain/ListEntity";

export class ListMapper {
  static toEntity(initialData: IList): List {
    const { id, title, userId, boardId, createdAt, updatedAt } = initialData;

    return new List(id, title, boardId, userId, createdAt, updatedAt);
  }

  static toDto(entity: List): ListDto {
    const { id, title, boardId, createdAt, updatedAt } = entity;

    return new ListDto(id, title, boardId, createdAt, updatedAt);
  }
}
