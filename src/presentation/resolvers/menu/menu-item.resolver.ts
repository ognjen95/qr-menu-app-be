import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateMenuItemInput } from '../../../domain/menu/dto/create-menu-item.input';
import { MenuItemEntity } from '../../../domain/menu/entities/menu-item.entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateMenuItemCommand } from '../../../application/commands/menu/create-menu-item/create-menu-item.command';
import { CurrentUser } from '../../decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { UpdateMenuItemCommand } from '../../../application/commands/menu/update-menu-item/update-menu-item.command';
import { UpdateMenuItemInput } from '../../../domain/menu/dto/update-menu-item.input';
import { DeleteMenuItemCommand } from '../../../application/commands/menu/delete-menu-item/delete-menu-item.command';

@Resolver(() => MenuItemEntity)
export class MenuItemResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => String)
  createMenuItem(
    @Args('args') createMenuItemInput: CreateMenuItemInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.commandBus.execute(
      new CreateMenuItemCommand(createMenuItemInput, currentUser),
    );
  }

  @Mutation(() => String)
  updateMenuItem(
    @Args('args') args: UpdateMenuItemInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.commandBus.execute(
      new UpdateMenuItemCommand(args, currentUser),
    );
  }

  @Mutation(() => String)
  deleteMenuItem(
    @Args('id') id: string,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.commandBus.execute(new DeleteMenuItemCommand(id, currentUser));
  }

  @Query(() => [MenuItemEntity], { name: 'menuItem' })
  findAll() {
    // return this.menuItemService.findAll();
  }
}
