export class GetBoardDto {
  constructor(
    public readonly id: number,
    public readonly userId: number
  ) {}
}
