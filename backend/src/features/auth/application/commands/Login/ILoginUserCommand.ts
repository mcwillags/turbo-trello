import { ICommand } from "~common/application/interfaces/ICommand";
import { LoginDto } from "~features/auth/application/dto/LoginDto";
import { LoginUserResponse } from "~features/auth/application/responses/LoginUserResponse";

export abstract class ILoginUserCommand extends ICommand<LoginDto, LoginUserResponse> {}
