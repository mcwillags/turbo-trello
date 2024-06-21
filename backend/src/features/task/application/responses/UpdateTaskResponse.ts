import { TaskDto } from "../dto/TaskDto";

export class UpdateTaskResponse {
  constructor(public readonly task: TaskDto) {}
}
