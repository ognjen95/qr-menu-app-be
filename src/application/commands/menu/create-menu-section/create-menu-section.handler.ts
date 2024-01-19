import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuSectionCommand } from './create-menu-section.command';
import { Inject } from '@nestjs/common';
import { MENU_SECTION_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { MenuSection } from '../../../../domain/menu/menu-section';
import { IMenuSectionRepository } from '../../../common/interfaces/menu/menu-section-repository.interface';

@CommandHandler(CreateMenuSectionCommand)
class CreateMenuSectionHandler
  implements ICommandHandler<CreateMenuSectionCommand>
{
  constructor(
    @Inject(MENU_SECTION_REPOSITORY_TOKEN)
    private readonly menuSectionRepository: IMenuSectionRepository,
  ) {}

  async execute({ dto }: CreateMenuSectionCommand): Promise<string> {
    const menuSection = new MenuSection(dto.name, dto.menuId, dto.description);

    const createdMenu = await this.menuSectionRepository.create(menuSection);

    return createdMenu.id;
  }
}

export default CreateMenuSectionHandler;
