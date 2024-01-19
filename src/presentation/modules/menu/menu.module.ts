import { Module } from '@nestjs/common';
import { MenuResolver } from '../../resolvers/menu/menu.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import CreateMenuHandler from '../../../application/commands/menu/create-menu/create-menu.handler';
import { MenuRepository } from '../../../infrastructure/repositories/menu/menu.repository';
import {
  MENU_REPOSITORY_TOKEN,
  MENU_SECTION_REPOSITORY_TOKEN,
} from '../../../application/common/constants/tokens';
import { MenuSectionRepository } from '../../../infrastructure/repositories/menu/menu-section.repository';
import GetMenuHandler from '../../../application/queries/menu/get-menu/get-menu.handler';
import GetMenusHandler from '../../../application/queries/menu/get-menus/get-menus.handler';
import GetMenuSectionssHandler from '../../../application/queries/menu/get-menu-sections/get-menu-sections.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    MenuResolver,
    CreateMenuHandler,
    GetMenuHandler,
    GetMenusHandler,
    GetMenuSectionssHandler,
    {
      provide: MENU_REPOSITORY_TOKEN,
      useClass: MenuRepository,
    },
    {
      provide: MENU_SECTION_REPOSITORY_TOKEN,
      useClass: MenuSectionRepository,
    },
  ],
})
export class MenuModule {}
