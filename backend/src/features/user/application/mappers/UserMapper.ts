import { User as IUser } from "@prisma/client";

import { UserDto } from "~features/user/application/dto/UserDto";
import { User } from "~features/user/domain/UserEntity";

export class UserMapper {
  static toEntity(initialData: IUser): User {
    const { id, email, password, banStartTime, unsuccessfulLoginAttemptsCount } = initialData;

    return new User(id, email, password, unsuccessfulLoginAttemptsCount, banStartTime);
  }

  static toDto(entity: User): UserDto {
    const { id, email } = entity;

    return new UserDto(id, email);
  }
}
