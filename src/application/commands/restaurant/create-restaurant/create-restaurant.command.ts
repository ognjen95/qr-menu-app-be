import { CreateRestaurantInput } from '../../../../domain/restaurant/dto/create-restaurant.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class CreateRestaurantCommand {
  constructor(
    public readonly dto: CreateRestaurantInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
