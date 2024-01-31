import { UpdateMenuInput } from '../../../../domain/menu/dto/update-menu.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class UpdateMenuCommand {
  constructor(
    public readonly dto: UpdateMenuInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
