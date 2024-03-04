import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class FindThemeByIdQuery {
  constructor(
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
