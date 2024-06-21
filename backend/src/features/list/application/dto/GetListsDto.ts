export class GetListsDto {
  constructor(
    public readonly boardId: number,
    public readonly userId: number
  ) {}
}
