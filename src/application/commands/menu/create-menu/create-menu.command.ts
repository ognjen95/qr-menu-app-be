import { CreateMenuInput } from '../../../../domain/menu/dto/create-menu.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class CreateMenuCommand {
  constructor(
    public readonly dto: CreateMenuInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
