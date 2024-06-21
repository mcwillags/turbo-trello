import { BadRequestException, ForbiddenException, Inject } from "@nestjs/common";

import { ICryptoService } from "~common/application/services/CryptoService/ICryptoService";
import { CommonServiceToken } from "~common/diTokens";
import { LoginConfig } from "~config/LoginConfig";
import { IncorrectCredentialsError } from "~features/auth/application/errors/IncorrectCredentialsError";
import { LoginRestrictedError } from "~features/auth/application/errors/LoginRestrictedError";
import { calculateRemainingBanTime } from "~features/auth/application/helpers/calculateRemainingBanTime";
import { checkIsBanned } from "~features/auth/application/helpers/checkIsBanned";
import { createBanTime } from "~features/auth/application/helpers/createBanTime";
import { formatTime, TimeFormat } from "~features/auth/application/helpers/formatTime";
import { LoginUserRequest } from "~features/auth/application/requests/LoginUserRequest";
import { IUserRepository } from "~features/user/application/interfaces/IUserRepository";
import { UserRepositoryToken } from "~features/user/diTokens";
import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";
import { User } from "~features/user/domain/UserEntity";

import { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
  @Inject(UserRepositoryToken.USER_REPOSITORY)
  private _userRepository: IUserRepository;

  @Inject(CommonServiceToken.CRYPTO_SERVICE)
  private _cryptoService: ICryptoService;

  async getUserByEmail(email: string) {
    const user = await this._userRepository.getByEmail(email);

    if (!user) throw new IncorrectCredentialsError();

    return user;
  }

  async validateLoginAttempt(user: User, request: LoginUserRequest) {
    const newLoginAttempt = this.validateCurrentAttemptState(user);

    const isPasswordCorrect = await this._cryptoService.compare(request.password, user.password);

    if (isPasswordCorrect) return;

    newLoginAttempt.incrementLoginAttempts();

    await this.saveNewLoginAttempt(user, newLoginAttempt);

    throw new IncorrectCredentialsError();
  }

  private validateCurrentAttemptState(user: User): LoginAttempt {
    const isLoginRestricted = checkIsBanned(user.banStartTime, LoginConfig.loginRestrictionTimeMs);

    if (isLoginRestricted) {
      const banTimeRemaining = calculateRemainingBanTime(user.banStartTime, LoginConfig.loginRestrictionTimeMs);

      throw new LoginRestrictedError(
        `Too many attempts, try again in ${formatTime(banTimeRemaining, TimeFormat.MIN)} minutes`,
        banTimeRemaining
      );
    }

    return new LoginAttempt(user.unsuccessfulLoginAttemptsCount, user.banStartTime);
  }

  private async saveNewLoginAttempt(user: User, loginAttempt: LoginAttempt) {
    if (loginAttempt.unsuccessfulLoginAttemptsCount === LoginConfig.maximumLoginAttempts) {
      const newBanTime = createBanTime();

      loginAttempt.setBanStart(newBanTime);
      loginAttempt.clearLoginAttempts();
    }

    await this._userRepository.saveNewLoginAttempt(user.id, loginAttempt);
  }
}
