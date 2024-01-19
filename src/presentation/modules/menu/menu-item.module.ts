import { Module } from '@nestjs/common';
import { MenuItemResolver } from '../../resolvers/menu/menu-item.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import CreateMenuItemHandler from '../../../application/commands/menu/create-menu-item/create-menu-item.handler';
import { MenuItemRepository } from '../../../infrastructure/repositories/menu/menu-item.repository';
import { MENU_ITEM_REPOSITORY_TOKEN } from '../../../application/common/constants/tokens';

@Module({
  imports: [CqrsModule],
  providers: [
    MenuItemResolver,
    CreateMenuItemHandler,
    {
      provide: MENU_ITEM_REPOSITORY_TOKEN,
      useClass: MenuItemRepository,
    },
  ],
})
export class MenuItemModule {}
