export class CreateBoardDto {
  constructor(
    public readonly userId: number,
    public readonly title: string
  ) {}
}
