import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBoardRequest {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
