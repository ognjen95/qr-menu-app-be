import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuSectionssQuery } from './get-menu-sectionss.query';
import { Inject } from '@nestjs/common';
import { MENU_SECTION_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { Connection, connectionFromArray } from 'graphql-relay';
import { IMenuSectionRepository } from '../../../common/interfaces/menu/menu-section-repository.interface';
import { MenuSection } from '../../../../domain/menu/menu-section';

@QueryHandler(GetMenuSectionssQuery)
class GetMenuSectionssHandler implements IQueryHandler<GetMenuSectionssQuery> {
  constructor(
    @Inject(MENU_SECTION_REPOSITORY_TOKEN)
    private readonly menuSectionRepository: IMenuSectionRepository,
  ) {}

  async execute({
    options,
  }: GetMenuSectionssQuery): Promise<Connection<MenuSection>> {
    const menuSections = await this.menuSectionRepository.find(options);

    return connectionFromArray(menuSections, {});
  }
}

export default GetMenuSectionssHandler;
