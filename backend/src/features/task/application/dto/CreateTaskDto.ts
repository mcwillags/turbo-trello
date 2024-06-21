export class CreateTaskDto {
  constructor(
    public readonly title: string,
    public readonly userId: number,
    public readonly listId: number
  ) {}
}
