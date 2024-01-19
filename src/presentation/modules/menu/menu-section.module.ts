import { Module } from '@nestjs/common';
import { MenuSectionResolver } from '../../resolvers/menu/menu-section.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import CreateMenuSectionHandler from '../../../application/commands/menu/create-menu-section/create-menu-section.handler';
import {
  MENU_ITEM_REPOSITORY_TOKEN,
  MENU_SECTION_REPOSITORY_TOKEN,
} from '../../../application/common/constants/tokens';
import { MenuSectionRepository } from '../../../infrastructure/repositories/menu/menu-section.repository';
import { MenuItemRepository } from '../../../infrastructure/repositories/menu/menu-item.repository';
import GetMenuItemsHandler from '../../../application/queries/menu/get-menu-items/get-menu-items.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    MenuSectionResolver,
    CreateMenuSectionHandler,
    GetMenuItemsHandler,
    {
      provide: MENU_SECTION_REPOSITORY_TOKEN,
      useClass: MenuSectionRepository,
    },
    {
      provide: MENU_ITEM_REPOSITORY_TOKEN,
      useClass: MenuItemRepository,
    },
  ],
})
export class MenuSectionModule {}
