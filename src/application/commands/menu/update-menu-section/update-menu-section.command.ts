import { UpdateMenuSectionInput } from '../../../../domain/menu/dto/update-menu-section.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class UpdateMenuSectionCommand {
  constructor(
    public readonly dto: UpdateMenuSectionInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
