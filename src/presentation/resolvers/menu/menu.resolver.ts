import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { MenuEntity } from '../../../domain/menu/entities/menu.entity';
import { CreateMenuInput } from '../../../domain/menu/dto/create-menu.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentUser } from '../../decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { CreateMenuCommand } from '../../../application/commands/menu/create-menu/create-menu.command';
import { GetMenuQuery } from '../../../application/queries/menu/get-menu/get-menu.query';
import { GetMenusQuery } from '../../../application/queries/menu/get-menus/get-menus.query';
import { MenuOptionsInput } from '../../../domain/menu/dto/menu-query-options.input';
import { GetMenuSectionssQuery } from '../../../application/queries/menu/get-menu-sections/get-menu-sectionss.query';
import { MenuSectionsOptionsInput } from '../../../domain/menu/dto/menu-section-query-options';
import { MenuSectionConnection } from '../../../domain/menu/entities/menu-section.connection';
import { MenuConnection } from '../../../domain/menu/entities/menu.connection';

@Resolver(() => MenuEntity)
export class MenuResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  createMenu(
    @Args('createMenuInput') createMenuInput: CreateMenuInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.commandBus.execute(
      new CreateMenuCommand(createMenuInput, currentUser),
    );
  }

  @Query(() => MenuConnection, { name: 'menus' })
  findAll(
    @Args('options', { nullable: true }) options: MenuOptionsInput = {},
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.queryBus.execute(new GetMenusQuery(options, currentUser));
  }

  @Query(() => MenuEntity, { name: 'menu' })
  findOne(
    @Args('options', { nullable: true }) options: MenuOptionsInput = {},
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.queryBus.execute(new GetMenuQuery(options, currentUser));
  }

  @ResolveField('menuSections', () => MenuSectionConnection)
  findMenuSections(
    @Args('options', { nullable: true }) options: MenuSectionsOptionsInput = {},
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.queryBus.execute(
      new GetMenuSectionssQuery(options, currentUser),
    );
  }
}
