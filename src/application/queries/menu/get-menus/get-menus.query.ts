import { MenuOptionsInput } from '../../../../domain/menu/dto/menu-query-options.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class GetMenusQuery {
  constructor(
    public readonly options: MenuOptionsInput,
    public readonly currentUser: CurrentUserInfo,
  ) {
    if (currentUser?.tenantId) {
      this.options.where = {
        ...this.options.where,
        tenantId: currentUser.tenantId,
      };
    }
  }
}
