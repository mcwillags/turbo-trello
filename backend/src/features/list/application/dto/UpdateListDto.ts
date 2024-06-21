export class UpdateListDto {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly title: string
  ) {}
}
