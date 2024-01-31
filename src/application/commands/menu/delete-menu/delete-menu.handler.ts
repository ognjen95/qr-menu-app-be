import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMenuCommand } from './delete-menu.command';
import { IMenuRepository } from '../../../common/interfaces/menu/menu-repository.interface';
import { Inject } from '@nestjs/common';
import { MENU_REPOSITORY_TOKEN } from '../../../common/constants/tokens';

@CommandHandler(DeleteMenuCommand)
class DeleteMenuHandler implements ICommandHandler<DeleteMenuCommand> {
  constructor(
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly menuRepository: IMenuRepository,
  ) { }

  async execute({ id }: DeleteMenuCommand): Promise<string> {
    const deletedMenu = await this.menuRepository.delete(id);

    return deletedMenu.id;
  }
}

export default DeleteMenuHandler;
