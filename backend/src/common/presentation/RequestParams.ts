import { IsNumberString } from "class-validator";

export class RequestParams {
  @IsNumberString()
  readonly id: string;
}
