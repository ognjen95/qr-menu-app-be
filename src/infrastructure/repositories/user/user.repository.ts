import { Inject, Injectable } from '@nestjs/common';

import { User } from '@domain/user/entity/user';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';
import { UserQueryOptionsInput } from '@domain/user/dtos/query-options.input';
import { UserRoles } from '../../../domain/user/enums';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: User): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        id: dto.id,
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        email: dto.email,
        externalId: dto.externalId,
        userRole: dto.userRole as UserRoles,
        phone: dto.phone,
        nationality: dto.nationality,
        birthday: dto.birthday,
        tenantId: dto.tenantId,
      },
    });

    return plainToInstance(User, user);
  }

  async findAll(options: UserQueryOptionsInput): Promise<User[]> {
    const users = await this.prismaService.user.findMany({});

    return plainToInstance(User, users);
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return plainToInstance(User, user);
  }

  async findOneByExternalId(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { externalId: id },
      select: {
        id: true,
        userRole: true,
        firstName: true,
        lastName: true,
        tenantId: true,
      },
    });
    return plainToInstance(User, user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    console.log({ user });

    return plainToInstance(User, user);
  }

  async update(id: string, dto: User): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: {},
    });

    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<User> {
    const removedUser = await this.prismaService.user.delete({ where: { id } });
    return plainToInstance(User, removedUser);
  }
}
