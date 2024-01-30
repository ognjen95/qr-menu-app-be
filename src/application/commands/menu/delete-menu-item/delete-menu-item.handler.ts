import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMenuItemCommand } from './delete-menu-item.command';
import { Inject } from '@nestjs/common';
import { MENU_ITEM_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { IMenuItemRepository } from '../../../common/interfaces/menu/menu-item-repository.interface';
import { MenuItem } from '../../../../domain/menu/menu-item';

@CommandHandler(DeleteMenuItemCommand)
class DeleteMenuItemHandler implements ICommandHandler<DeleteMenuItemCommand> {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY_TOKEN)
    private readonly menuItemRepository: IMenuItemRepository,
  ) { }

  async execute({ id }: DeleteMenuItemCommand): Promise<string> {
    const deletedMenuItem: MenuItem = await this.menuItemRepository.delete(id);

    return deletedMenuItem.id;
  }
}

export default DeleteMenuItemHandler;
