import { MenuItemOptionsInput } from '../../../../domain/menu/dto/menu-item-options.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class GetMenuItemsQuery {
  constructor(
    public readonly options: MenuItemOptionsInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
