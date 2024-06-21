import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserRequest {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(12, 60)
  readonly password: string;
}