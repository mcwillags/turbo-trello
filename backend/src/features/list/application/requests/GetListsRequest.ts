import { IsNotEmpty, IsNumber, Validate } from "class-validator";


export class GetListsRequest {
  @IsNumber()
  @IsNotEmpty()
  readonly boardId: number;
}
