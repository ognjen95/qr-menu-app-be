import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ThemeConfigurationEntity } from '../../../domain/theme/theme-config/entities/theme-configuration.entity';
import { CreateThemeConfigurationInput } from '../../../domain/theme/theme-config/dto/create-theme-configuration.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateThemeCommand } from '../../../application/commands/theme/create-theme/create-theme.command';
import { CurrentUser } from '../../decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { FindThemeByIdQuery } from '../../../application/queries/theme/find-theme-by-Id/find-theme-by-id.query';

@Resolver(() => ThemeConfigurationEntity)
export class ThemeConfigurationResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Mutation(() => String)
  createThemeConfiguration(
    @Args('args') args: CreateThemeConfigurationInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.commandBus.execute(new CreateThemeCommand(args, currentUser));
  }

  @Query(() => ThemeConfigurationEntity)
  findThemeById(
    @Args('id') id: string,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.queryBus.execute(new FindThemeByIdQuery(id, currentUser));
  }
}
