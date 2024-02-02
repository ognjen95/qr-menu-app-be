import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMenuSectionCommand } from './update-menu-section.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { MENU_SECTION_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { IMenuSectionRepository } from '../../../common/interfaces/menu/menu-section-repository.interface';

@CommandHandler(UpdateMenuSectionCommand)
class UpdateMenuSectionHandler
  implements ICommandHandler<UpdateMenuSectionCommand>
{
  constructor(
    @Inject(MENU_SECTION_REPOSITORY_TOKEN)
    private readonly menuSectionRepository: IMenuSectionRepository,
  ) {}

  async execute({ dto }: UpdateMenuSectionCommand): Promise<string> {
    const [menuSection] = await this.menuSectionRepository.find({
      where: {
        id: {
          equals: dto.id,
        },
      },
    });

    if (!menuSection) throw new BadRequestException('Menu not found');

    menuSection.name = dto.name;
    menuSection.description = dto.description;
    menuSection.menuItemIds = dto.menuItemIds;

    await this.menuSectionRepository.update(menuSection);

    return menuSection.id;
  }
}

export default UpdateMenuSectionHandler;
