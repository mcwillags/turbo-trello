import { Injectable } from "@nestjs/common";

import { ICreateUser } from "~features/user/application/interfaces/ICreateUser";
import { IUserRepository } from "~features/user/application/interfaces/IUserRepository";
import { UserMapper } from "~features/user/application/mappers/UserMapper";
import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";
import { User } from "~features/user/domain/UserEntity";
import { PrismaService } from "~prisma/PrismaService";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.user;
  }

  async create(createUserDto: ICreateUser): Promise<User> {
    const user = await this.collection.create({
      data: { ...createUserDto },
    });

    return UserMapper.toEntity(user);
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.collection.findUnique({ where: { email } });

    if (!user) return null;

    return UserMapper.toEntity(user);
  }

  async saveNewLoginAttempt(id: number, loginAttempt: LoginAttempt): Promise<void> {
    await this.collection.update({
      where: { id },
      data: {
        banStartTime: loginAttempt.banStartTime,
        unsuccessfulLoginAttemptsCount: loginAttempt.unsuccessfulLoginAttemptsCount,
      },
    });
  }
}
