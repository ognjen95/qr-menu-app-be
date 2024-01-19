import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuCommand } from './create-menu.command';
import { IMenuRepository } from '../../../common/interfaces/menu/menu-repository.interface';
import { Menu } from '../../../../domain/menu/menu';
import { Inject } from '@nestjs/common';
import { MENU_REPOSITORY_TOKEN } from '../../../common/constants/tokens';

@CommandHandler(CreateMenuCommand)
class CreateMenuHandler implements ICommandHandler<CreateMenuCommand> {
  constructor(
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute({ dto, currentUser }: CreateMenuCommand): Promise<string> {
    const menu = new Menu(
      dto.name,
      currentUser.tenantId,
      dto.description,
      dto.restaurantId,
    );

    const createdMenu = await this.menuRepository.create(menu);

    return createdMenu.id;
  }
}

export default CreateMenuHandler;
