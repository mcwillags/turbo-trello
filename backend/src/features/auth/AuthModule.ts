import { Module } from "@nestjs/common";

import { CommonModule } from "~common/CommonModule";
import { LoginUserCommand } from "~features/auth/application/commands/Login/LoginUserCommand";
import { ResetSessionCommand } from "~features/auth/application/commands/ResetSessionCommand/ResetSessionCommand";
import { RefreshTokenCommand } from "~features/auth/application/commands/Token/RefreshTokenCommand";
import { AuthService } from "~features/auth/application/services/AuthService/AuthService";
import { UserModule } from "~features/user/UserModule";
import { PrismaModule } from "~prisma/PrismaModule";
import { createProvider } from "~utils/functions/createProvider";

import { AuthCommandToken, AuthServiceToken } from "./diTokens";
import { AuthController } from "./presentation/AuthController";

@Module({
  imports: [UserModule, PrismaModule, CommonModule],
  controllers: [AuthController],
  providers: [
    createProvider(AuthServiceToken.AUTH_SERVICE, AuthService),
    createProvider(AuthCommandToken.LOGIN_USER_COMMAND, LoginUserCommand),
    createProvider(AuthCommandToken.REFRESH_TOKEN_COMMAND, RefreshTokenCommand),
    createProvider(AuthCommandToken.RESET_SESSION_COMMAND, ResetSessionCommand)
  ],
})
export class AuthModule {}
