export class UpdateBoardDto {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly userId: number
  ) {}
}
