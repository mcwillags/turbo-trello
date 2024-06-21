import { Module } from "@nestjs/common";

import { CommonModule } from "~common/CommonModule";
import { CreateUserCommand } from "~features/user/application/commands/CreateUserCommand";
import { UserCommandToken, UserRepositoryToken } from "~features/user/diTokens";
import { UserRepository } from "~features/user/infrastructure/UserRepository";
import { PrismaModule } from "~prisma/PrismaModule";
import { createProvider } from "~utils/functions/createProvider";

@Module({
  imports: [PrismaModule, CommonModule],
  providers: [
    createProvider(UserRepositoryToken.USER_REPOSITORY, UserRepository),
    createProvider(UserCommandToken.CREATE_USER_COMMAND, CreateUserCommand),
  ],
  exports: [UserCommandToken.CREATE_USER_COMMAND, UserRepositoryToken.USER_REPOSITORY],
})
export class UserModule {}
