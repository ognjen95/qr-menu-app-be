import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuItemCommand } from './create-menu-item.command';
import { Inject } from '@nestjs/common';
import { MENU_ITEM_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { IMenuItemRepository } from '../../../common/interfaces/menu/menu-item-repository.interface';
import { MenuItem } from '../../../../domain/menu/menu-item';

@CommandHandler(CreateMenuItemCommand)
class CreateMenuItemHandler implements ICommandHandler<CreateMenuItemCommand> {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY_TOKEN)
    private readonly menuItemRepository: IMenuItemRepository,
  ) {}

  async execute({ dto }: CreateMenuItemCommand): Promise<string> {
    const menuItem = new MenuItem(
      dto.name,
      dto.menuSectionId,
      dto.variants,
      dto.description,
    );

    const createdMenuItem = await this.menuItemRepository.create(menuItem);

    return createdMenuItem.id;
  }
}

export default CreateMenuItemHandler;
