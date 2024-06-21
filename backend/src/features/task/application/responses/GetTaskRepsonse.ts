import { TaskDto } from "~features/task/application/dto/TaskDto";

export class GetTaskRepsonse {
  constructor(public readonly task: TaskDto) {}
}