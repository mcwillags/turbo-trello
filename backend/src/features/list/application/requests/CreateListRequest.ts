import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";

export class CreateListRequest {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly boardId: number;
}
