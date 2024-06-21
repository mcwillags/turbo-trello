import { BaseEntity } from "~common/domain/BaseEntity";

export class Board extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly userId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    super(id);
  }
}
