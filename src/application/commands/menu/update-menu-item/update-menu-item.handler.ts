import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMenuItemCommand } from './update-menu-item.command';
import { Inject } from '@nestjs/common';
import { MENU_ITEM_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { IMenuItemRepository } from '../../../common/interfaces/menu/menu-item-repository.interface';
import { MenuItem } from '../../../../domain/menu/menu-item';

@CommandHandler(UpdateMenuItemCommand)
class UpdateMenuItemHandler implements ICommandHandler<UpdateMenuItemCommand> {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY_TOKEN)
    private readonly menuItemRepository: IMenuItemRepository,
  ) { }

  async execute({ dto }: UpdateMenuItemCommand): Promise<string> {
    const updatedMenuItem = new MenuItem(
      dto.name,
      dto.menuSectionId,
      dto.variants,
      dto.description,
    );

    updatedMenuItem.image = dto.image;
    updatedMenuItem.id = dto.id;
    updatedMenuItem.tags = dto.tags;
    updatedMenuItem.alergens = dto.alergens;

    const [foundMenuItem] = await this.menuItemRepository.find({
      where: {
        id: {
          equals: dto.id,
        },
      },
    });

    if (dto.image !== foundMenuItem.image) {
      // Delete old image from bucket
    }

    const createdMenuItem = await this.menuItemRepository.update(
      updatedMenuItem,
    );

    return createdMenuItem.id;
  }
}

export default UpdateMenuItemHandler;
