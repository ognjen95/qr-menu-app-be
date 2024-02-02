import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMenuSectionCommand } from './delete-menu-section.command';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  MENU_REPOSITORY_TOKEN,
  MENU_SECTION_REPOSITORY_TOKEN,
} from '../../../common/constants/tokens';
import { IMenuSectionRepository } from '../../../common/interfaces/menu/menu-section-repository.interface';
import { IMenuRepository } from '../../../common/interfaces/menu/menu-repository.interface';

@CommandHandler(DeleteMenuSectionCommand)
class DeleteMenuSectionHandler
  implements ICommandHandler<DeleteMenuSectionCommand>
{
  constructor(
    @Inject(MENU_SECTION_REPOSITORY_TOKEN)
    private readonly menuSectionRepository: IMenuSectionRepository,
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute({ id }: DeleteMenuSectionCommand): Promise<string> {
    const deletedMenuSection = await this.menuSectionRepository.delete(id);

    if (!deletedMenuSection) throw new BadRequestException('Menu not found');

    const [menu] = await this.menuRepository.find({
      where: { id: { equals: deletedMenuSection.menuId } },
    });

    menu.removeSection(deletedMenuSection.id);

    await this.menuRepository.update(menu);

    return deletedMenuSection.id;
  }
}

export default DeleteMenuSectionHandler;
