import { MenuSectionsOptionsInput } from '../../../../domain/menu/dto/menu-section-query-options';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class GetMenuSectionssQuery {
  constructor(
    public readonly options: MenuSectionsOptionsInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
