import { ICommand } from "~common/application/interfaces/ICommand";
import { RegisterUserResponse } from "~features/auth/application/responses/RegisterUserResponse";
import { CreateUserDto } from "~features/user/application/dto/CreateUserDto";

export abstract class ICreateUserCommand extends ICommand<CreateUserDto, RegisterUserResponse> {}
