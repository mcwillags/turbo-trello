export class CreateTaskRequest {
  constructor(
    public readonly title: string,
    public readonly listId: number
  ) {}
}