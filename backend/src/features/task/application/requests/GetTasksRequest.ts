import { IsNotEmpty, IsNumber } from "class-validator";

export class GetTasksRequest {
  @IsNumber()
  @IsNotEmpty()
  readonly listId: number;
}
