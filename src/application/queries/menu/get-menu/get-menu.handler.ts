import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuQuery } from './get-menu.query';
import { Inject } from '@nestjs/common';
import { MENU_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { IMenuRepository } from '../../../common/interfaces/menu/menu-repository.interface';
import { Menu } from '../../../../domain/menu/menu';

@QueryHandler(GetMenuQuery)
class GetMenuHandler implements IQueryHandler<GetMenuQuery> {
  constructor(
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute({ options }: GetMenuQuery): Promise<Menu> {
    const menus = await this.menuRepository.find(options);

    return menus?.[0];
  }
}

export default GetMenuHandler;
