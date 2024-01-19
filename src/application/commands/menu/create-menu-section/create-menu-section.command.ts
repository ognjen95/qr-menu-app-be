import { CreateMenuSectionInput } from '../../../../domain/menu/dto/create-menu-section.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class CreateMenuSectionCommand {
  constructor(
    public readonly dto: CreateMenuSectionInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
