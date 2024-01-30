import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class DeleteMenuItemCommand {
  constructor(
    public readonly id: string,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
