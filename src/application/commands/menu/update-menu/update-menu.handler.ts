import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMenuCommand } from './update-menu.command';
import { IMenuRepository } from '../../../common/interfaces/menu/menu-repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { MENU_REPOSITORY_TOKEN } from '../../../common/constants/tokens';

@CommandHandler(UpdateMenuCommand)
class UpdateMenuHandler implements ICommandHandler<UpdateMenuCommand> {
  constructor(
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly menuRepository: IMenuRepository,
  ) { }

  async execute({ dto, currentUser }: UpdateMenuCommand): Promise<string> {
    const [menu] = await this.menuRepository.find({
      where: { id: { equals: dto.id }, tenantId: currentUser.tenantId },
    });

    if (!menu) {
      throw new BadRequestException('Menu not found');
    }

    menu.name = dto.name;
    menu.description = dto.description;
    menu.isVisible = dto.isVisible;

    if (dto.menuSectionIds) {
      menu.menuSectionIds = dto.menuSectionIds;
    }

    const createdMenu = await this.menuRepository.update(menu);

    return createdMenu.id;
  }
}

export default UpdateMenuHandler;
