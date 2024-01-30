import { UpdateMenuItemInput } from '../../../../domain/menu/dto/update-menu-item.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class UpdateMenuItemCommand {
  constructor(
    public readonly dto: UpdateMenuItemInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
