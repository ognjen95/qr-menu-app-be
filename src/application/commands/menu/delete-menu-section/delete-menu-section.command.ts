import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class DeleteMenuSectionCommand {
  constructor(
    public readonly id: string,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
