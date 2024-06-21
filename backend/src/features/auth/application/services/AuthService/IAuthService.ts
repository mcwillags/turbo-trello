import { LoginDto } from "~features/auth/application/dto/LoginDto";
import { User } from "~features/user/domain/UserEntity";

export interface IAuthService {
  getUserByEmail(email: string): Promise<User>;

  validateLoginAttempt(user: User, input: LoginDto): Promise<void>;
}
