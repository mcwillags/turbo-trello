import { TaskDto } from "../dto/TaskDto";

export class ChangeTaskListResponse {
  constructor(public readonly task: TaskDto) {}
}
