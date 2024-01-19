import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuItemsQuery } from './get-menu-items.query';
import { Inject } from '@nestjs/common';
import { MENU_ITEM_REPOSITORY_TOKEN } from '../../../common/constants/tokens';
import { Connection, connectionFromArray } from 'graphql-relay';
import { IMenuItemRepository } from '../../../common/interfaces/menu/menu-item-repository.interface';
import { MenuItem } from '../../../../domain/menu/menu-item';

@QueryHandler(GetMenuItemsQuery)
class GetMenuItemsHandler implements IQueryHandler<GetMenuItemsQuery> {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY_TOKEN)
    private readonly menuItemRepository: IMenuItemRepository,
  ) {}

  async execute({ options }: GetMenuItemsQuery): Promise<Connection<MenuItem>> {
    const menuSections = await this.menuItemRepository.find(options);

    return connectionFromArray(menuSections, {});
  }
}

export default GetMenuItemsHandler;
