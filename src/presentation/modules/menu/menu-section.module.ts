import { Module } from '@nestjs/common';
import { MenuSectionResolver } from '../../resolvers/menu/menu-section.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import CreateMenuSectionHandler from '../../../application/commands/menu/create-menu-section/create-menu-section.handler';
import {
  MENU_ITEM_REPOSITORY_TOKEN,
  MENU_REPOSITORY_TOKEN,
  MENU_SECTION_REPOSITORY_TOKEN,
} from '../../../application/common/constants/tokens';
import { MenuSectionRepository } from '../../../infrastructure/repositories/menu/menu-section.repository';
import { MenuItemRepository } from '../../../infrastructure/repositories/menu/menu-item.repository';
import GetMenuItemsHandler from '../../../application/queries/menu/get-menu-items/get-menu-items.handler';
import { MenuRepository } from '../../../infrastructure/repositories/menu/menu.repository';
import UpdateMenuSectionHandler from '../../../application/commands/menu/update-menu-section/update-menu-section.handler';
import DeleteMenuSectionHandler from '../../../application/commands/menu/delete-menu-section/delete-menu-section.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    MenuSectionResolver,
    CreateMenuSectionHandler,
    GetMenuItemsHandler,
    UpdateMenuSectionHandler,
    DeleteMenuSectionHandler,
    {
      provide: MENU_SECTION_REPOSITORY_TOKEN,
      useClass: MenuSectionRepository,
    },
    {
      provide: MENU_ITEM_REPOSITORY_TOKEN,
      useClass: MenuItemRepository,
    },
    {
      provide: MENU_REPOSITORY_TOKEN,
      useClass: MenuRepository,
    },
  ],
})
export class MenuSectionModule {}
