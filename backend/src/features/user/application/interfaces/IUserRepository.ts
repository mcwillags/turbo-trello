import { CreateUserDto } from "~features/user/application/dto/CreateUserDto";
import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";
import { User } from "~features/user/domain/UserEntity";

export interface IUserRepository {
  create(userDto: CreateUserDto): Promise<User>;

  getByEmail(email: string): Promise<User | null>;

  saveNewLoginAttempt(userId: number, loginAttempt: LoginAttempt): Promise<void>;
}
