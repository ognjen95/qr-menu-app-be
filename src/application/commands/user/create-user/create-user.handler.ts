import { CreateUserCommand } from './create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IUserRepository } from '../../../common/interfaces/user/user-repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  AUTH_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../../../common/constants/tokens';
import { User } from '../../../../domain/user/entity/user';
import { IAuthService } from '../../../common/interfaces/auth/auth.interface';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async execute({ dto }: CreateUserCommand): Promise<string> {
    const user = new User(
      dto.firstName,
      dto.middleName,
      dto.lastName,
      dto.email,
      dto.userRole,
    );

    const userExists = await this.userRepository.findOneByEmail(user.email);

    if (userExists) {
      throw new BadRequestException('You can not create user');
    }

    const externalId = await this.authService.registerUser(
      dto.email,
      dto.password,
      dto.firstName,
      dto.lastName,
      dto.userRole,
      dto.tenantId,
    );

    user.tenantId = dto.tenantId;
    user.externalId = externalId;

    const newUser = await this.userRepository.create(user);

    return newUser.id;
  }
}

export default CreateUserHandler;
