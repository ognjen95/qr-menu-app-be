import { CreateMenuItemInput } from '../../../../domain/menu/dto/create-menu-item.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class CreateMenuItemCommand {
  constructor(
    public readonly dto: CreateMenuItemInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
