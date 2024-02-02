import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuItemCommand } from './create-menu-item.command';
import { Inject } from '@nestjs/common';
import {
  MENU_ITEM_REPOSITORY_TOKEN,
  MENU_SECTION_REPOSITORY_TOKEN,
} from '../../../common/constants/tokens';
import { IMenuItemRepository } from '../../../common/interfaces/menu/menu-item-repository.interface';
import { MenuItem } from '../../../../domain/menu/menu-item';
import { IMenuSectionRepository } from '../../../common/interfaces/menu/menu-section-repository.interface';

@CommandHandler(CreateMenuItemCommand)
class CreateMenuItemHandler implements ICommandHandler<CreateMenuItemCommand> {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY_TOKEN)
    private readonly menuItemRepository: IMenuItemRepository,
    @Inject(MENU_SECTION_REPOSITORY_TOKEN)
    private readonly menuSectionRepository: IMenuSectionRepository,
  ) { }

  async execute({ dto }: CreateMenuItemCommand): Promise<string> {
    const menuItem = new MenuItem(
      dto.name,
      dto.menuSectionId,
      dto.variants,
      dto.description,
    );

    menuItem.image = dto.image;
    menuItem.tags = dto.tags;
    menuItem.alergens = dto.alergens;

    const createdMenuItem = await this.menuItemRepository.create(menuItem);

    const [menuSection] = await this.menuSectionRepository.find({
      where: {
        id: {
          equals: dto.menuSectionId,
        },
      },
    });

    menuSection.menuItemIds = [...dto.menuItemsIds, createdMenuItem.id];

    await this.menuSectionRepository.update(menuSection);

    return createdMenuItem.id;
  }
}

export default CreateMenuItemHandler;
