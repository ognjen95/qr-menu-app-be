import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { CreateMenuSectionInput } from '../../../domain/menu/dto/create-menu-section.input';
import { MenuSectionEntity } from '../../../domain/menu/entities/menu-section.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMenuSectionCommand } from '../../../application/commands/menu/create-menu-section/create-menu-section.command';
import { CurrentUser } from '../../decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { MenuItemOptionsInput } from '../../../domain/menu/dto/menu-item-options.input';
import { GetMenuItemsQuery } from '../../../application/queries/menu/get-menu-items/get-menu-items.query';
import { MenuItemsConnection } from '../../../domain/menu/entities/menu-items.connection';
import { UpdateMenuSectionInput } from '../../../domain/menu/dto/update-menu-section.input';
import { UpdateMenuSectionCommand } from '../../../application/commands/menu/update-menu-section/update-menu-section.command';
import { DeleteMenuSectionCommand } from '../../../application/commands/menu/delete-menu-section/delete-menu-section.command';

@Resolver(() => MenuSectionEntity)
export class MenuSectionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Mutation(() => String)
  async updateMenuSection(
    @Args('args')
    args: UpdateMenuSectionInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return await this.commandBus.execute(
      new UpdateMenuSectionCommand(args, currentUser),
    );
  }

  @Mutation(() => String)
  async deleteMenuSection(
    @Args('id') id: string,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return await this.commandBus.execute(
      new DeleteMenuSectionCommand(id, currentUser),
    );
  }

  @Mutation(() => String)
  async createMenuSection(
    @Args('createMenuSectionInput')
    createMenuSectionInput: CreateMenuSectionInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return await this.commandBus.execute(
      new CreateMenuSectionCommand(createMenuSectionInput, currentUser),
    );
  }

  @ResolveField('menuItems', () => MenuItemsConnection)
  findMenuItems(
    @Parent() menuSection: MenuSectionEntity,
    @Args('options', { nullable: true }) options: MenuItemOptionsInput = {},
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    if (!options.where) options.where = {};

    options.where.sectionId = menuSection.id;

    return this.queryBus.execute(new GetMenuItemsQuery(options, currentUser));
  }
}
