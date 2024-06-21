import { IsNotEmpty, IsString } from "class-validator";

export class UpdateListRequest {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}