import { IsNotEmpty, IsString } from "class-validator";

export class CreateBoardRequest {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
