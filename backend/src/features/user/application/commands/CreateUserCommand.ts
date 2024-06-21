import { Inject, Injectable, Scope } from "@nestjs/common";

import { ICryptoService } from "~common/application/services/CryptoService/ICryptoService";
import { CommonServiceToken } from "~common/diTokens";
import { RegisterUserResponse } from "~features/auth/application/responses/RegisterUserResponse";
import { ICreateUserCommand } from "~features/user/application/commands/ICreateUserCommand";
import { CreateUserDto } from "~features/user/application/dto/CreateUserDto";
import { EmailInUseError } from "~features/user/application/errors/EmailInUseError";
import { IUserRepository } from "~features/user/application/interfaces/IUserRepository";
import { UserRepositoryToken } from "~features/user/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class CreateUserCommand implements ICreateUserCommand {
  @Inject(UserRepositoryToken.USER_REPOSITORY)
  private _userRepository: IUserRepository;

  @Inject(CommonServiceToken.CRYPTO_SERVICE)
  private _cryptoService: ICryptoService;

  async execute(dto: CreateUserDto): Promise<RegisterUserResponse> {
    const user = await this._userRepository.getByEmail(dto.email);

    if (user) throw new EmailInUseError();

    const hashedPassword = await this._cryptoService.hash(dto.password);

    await this._userRepository.create({
      email: dto.email,
      password: hashedPassword,
    });

    return new RegisterUserResponse().withMessage("User was created successfully");
  }
}
