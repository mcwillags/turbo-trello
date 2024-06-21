export class UpdateTaskDto {
  constructor(
    public readonly title: string,
    public readonly id: number,
    public readonly userId: number
  ) {}
}