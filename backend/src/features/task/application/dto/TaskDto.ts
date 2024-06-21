export class TaskDto {
  constructor(
    public readonly id: number,
    public readonly listId: number,
    public readonly title: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}