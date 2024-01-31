import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class DeleteRestaurantCommand {
  constructor(
    public readonly id: string,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
