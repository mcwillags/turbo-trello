export class DeleteBoardDto {
  constructor(
    public readonly id: number,
    public readonly userId: number
  ) {}
}
