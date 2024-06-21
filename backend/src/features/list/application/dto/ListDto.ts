export class ListDto {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly boardId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}