import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuSectionCommand } from './create-menu-section.command';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  MENU_REPOSITORY_TOKEN,
  MENU_SECTION_REPOSITORY_TOKEN,
} from '../../../common/constants/tokens';
import { MenuSection } from '../../../../domain/menu/menu-section';
import { IMenuSectionRepository } from '../../../common/interfaces/menu/menu-section-repository.interface';
import { IMenuRepository } from '../../../common/interfaces/menu/menu-repository.interface';

@CommandHandler(CreateMenuSectionCommand)
class CreateMenuSectionHandler
  implements ICommandHandler<CreateMenuSectionCommand>
{
  constructor(
    @Inject(MENU_SECTION_REPOSITORY_TOKEN)
    private readonly menuSectionRepository: IMenuSectionRepository,
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute({ dto }: CreateMenuSectionCommand): Promise<string> {
    const menuSection = new MenuSection(dto.name, dto.menuId, dto.description);

    const [menu] = await this.menuRepository.find({
      where: {
        id: {
          equals: dto.menuId,
        },
      },
    });

    if (!menu) throw new BadRequestException('Menu not found');

    const createdMenuSection = await this.menuSectionRepository.create(
      menuSection,
    );

    menu.reorderSections(
      dto.menuSectionsIds,
      dto.positionIndex,
      createdMenuSection.id,
    );

    await this.menuRepository.update(menu);

    return createdMenuSection.id;
  }
}

export default CreateMenuSectionHandler;
