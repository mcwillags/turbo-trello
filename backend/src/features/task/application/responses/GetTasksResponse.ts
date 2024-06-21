import { TaskDto } from "~features/task/application/dto/TaskDto";

export class GetTasksResponse {
  constructor(public readonly tasks: TaskDto[]) {}
}