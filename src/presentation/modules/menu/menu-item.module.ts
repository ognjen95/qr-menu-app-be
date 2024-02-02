import { Module } from '@nestjs/common';
import { MenuItemResolver } from '../../resolvers/menu/menu-item.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import CreateMenuItemHandler from '../../../application/commands/menu/create-menu-item/create-menu-item.handler';
import { MenuItemRepository } from '../../../infrastructure/repositories/menu/menu-item.repository';
import {
  MENU_ITEM_REPOSITORY_TOKEN,
  MENU_SECTION_REPOSITORY_TOKEN,
} from '../../../application/common/constants/tokens';
import UpdateMenuItemHandler from '../../../application/commands/menu/update-menu-item/update-menu-item.handler';
import DeleteMenuItemHandler from '../../../application/commands/menu/delete-menu-item/delete-menu-item.handler';
import { MenuSectionRepository } from '../../../infrastructure/repositories/menu/menu-section.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    MenuItemResolver,
    CreateMenuItemHandler,
    UpdateMenuItemHandler,
    DeleteMenuItemHandler,
    {
      provide: MENU_ITEM_REPOSITORY_TOKEN,
      useClass: MenuItemRepository,
    },
    {
      provide: MENU_SECTION_REPOSITORY_TOKEN,
      useClass: MenuSectionRepository,
    },
  ],
})
export class MenuItemModule {}
