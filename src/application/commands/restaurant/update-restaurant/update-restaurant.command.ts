import { UpdateRestaurantInput } from '../../../../domain/restaurant/dto/update-restaurant.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class UpdateRestaurantCommand {
  constructor(
    public readonly dto: UpdateRestaurantInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
