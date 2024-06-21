import { BaseEntity } from "~common/domain/BaseEntity";

export class List extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly boardId: number,
    public readonly userId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    super(id);
  }
}
