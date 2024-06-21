export class CreateListDto {
  constructor(
    public readonly title: string,
    public readonly userId: number,
    public readonly boardId: number
  ) {}
}
