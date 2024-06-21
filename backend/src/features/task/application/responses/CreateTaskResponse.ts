import { TaskDto } from "../dto/TaskDto";

export class CreateTaskResponse {
  constructor(public readonly task: TaskDto) {}
}
