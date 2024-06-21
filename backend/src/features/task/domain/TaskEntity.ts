import { BaseEntity } from "~common/domain/BaseEntity";

export class Task extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly listId: number,
    public readonly title: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    super(id);
  }
}
