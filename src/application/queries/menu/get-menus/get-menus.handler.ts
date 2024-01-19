import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenusQuery } from './get-menus.query';
import { Inject } from '@nestjs/common';
import { MENU_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { Connection, connectionFromArray } from 'graphql-relay';
import { IMenuRepository } from '../../../common/interfaces/menu/menu-repository.interface';
import { Menu } from '../../../../domain/menu/menu';

@QueryHandler(GetMenusQuery)
class GetMenusHandler implements IQueryHandler<GetMenusQuery> {
  constructor(
    @Inject(MENU_REPOSITORY_TOKEN)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute({ options }: GetMenusQuery): Promise<Connection<Menu>> {
    const menus = await this.menuRepository.find(options);

    return connectionFromArray(menus, {});
  }
}

export default GetMenusHandler;
