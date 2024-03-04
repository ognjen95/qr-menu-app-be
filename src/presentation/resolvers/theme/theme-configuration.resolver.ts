import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ThemeConfigurationEntity } from '../../../domain/theme/theme-config/entities/theme-configuration.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveThemeCommand } from '../../../application/commands/theme/save-theme/save-theme.command';
import { CurrentUser } from '../../decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { UpdateThemeConfigurationInput } from '../../../domain/theme/theme-config/dto/update-theme-configuration.input';
import { FindThemeByIdQuery } from '../../../application/queries/theme/find-theme-by-tenant-id/find-theme-by-id.query';

@Resolver(() => ThemeConfigurationEntity)
export class ThemeConfigurationResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Mutation(() => String)
  saveThemeConfiguration(
    @Args('args') args: UpdateThemeConfigurationInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    const argsWithId = { ...args, id: args.id ?? '' };

    return this.commandBus.execute(new SaveThemeCommand(argsWithId, currentUser));
  }

  @Query(() => ThemeConfigurationEntity)
  findThemeByTenantId(
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.queryBus.execute(new FindThemeByIdQuery(currentUser));
  }
}
