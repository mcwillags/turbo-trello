export class ChangeTaskListDto {
  constructor(
    public readonly id: number,
    public readonly listId: number,
    public readonly userId: number
  ) {}
}
