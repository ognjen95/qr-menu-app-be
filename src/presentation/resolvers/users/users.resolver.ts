import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '@application/commands/user/create-user/create-user.command';
import { FindAllUsersQuery } from '@application/queries/users/find-all/find-all-users.query';
import { FindUserByIdQuery } from '@application/queries/users/find-user-by-id/find-user-by-id.query';
import { UpdateUserCommand } from '@application/commands/user/update-user/update-user.command';
import { RemoveUserCommand } from '@application/commands/user/remove-user/remove-user.command';

import { CreateUserInput } from '@domain/user/dtos/create-user.input';
import { UpdateUserInput } from '@domain/user/dtos/update-user.input';
import { UserQueryOptionsInput } from '@domain/user/dtos/query-options.input';
import { UserConnection } from '@domain/user/entity/user-connection';

import { UserEntity } from '@domain/user/entity/user.entity';
import { IsPublic } from '@presentation/decorators/is-public';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @IsPublic()
  @Mutation(() => String)
  async createUser(@Args('args') args: CreateUserInput) {
    return await this.commandBus.execute<CreateUserCommand, UserEntity>(
      new CreateUserCommand(args),
    );
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args('args') args: UpdateUserInput) {
    return await this.commandBus.execute<UpdateUserCommand, UserEntity>(
      new UpdateUserCommand(args),
    );
  }

  @Mutation(() => UserEntity)
  async removeUser(@Args('id') id: string) {
    return await this.commandBus.execute<RemoveUserCommand, UserEntity>(
      new RemoveUserCommand(id),
    );
  }

  @Query(() => UserConnection, { name: 'users' })
  async findAll(
    @Args('args', { nullable: true })
    args: UserQueryOptionsInput,
  ) {
    return await this.queryBus.execute<FindAllUsersQuery, UserEntity>(
      new FindAllUsersQuery(args),
    );
  }

  @Query(() => UserEntity, { name: 'userById' })
  async findOneById(@Args('id') id: string) {
    return await this.queryBus.execute<FindUserByIdQuery, UserEntity>(
      new FindUserByIdQuery(id),
    );
  }
}
