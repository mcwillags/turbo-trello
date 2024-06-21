export class GetTasksDto {
  constructor(
    public readonly listId: number,
    public readonly userId: number
  ) {}
}
