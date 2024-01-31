import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class DeleteMenuCommand {
  constructor(
    public readonly id: string,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
