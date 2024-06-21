export class DeleteTaskDto {
  constructor(
    public readonly id: number,
    public readonly userId: number
  ) {}
}
