export class GetTaskDto {
  constructor(
    public readonly id: number,
    public readonly userId: number
  ) {}
}
