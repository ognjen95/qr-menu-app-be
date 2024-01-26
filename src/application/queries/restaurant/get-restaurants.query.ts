import { RestaurantOptionsInput } from '../../../domain/restaurant/dto/restaurant-query-options.input';
import { CurrentUserInfo } from '../../../presentation/resolvers/auth/types';

export class GetRestaurantsQuery {
  constructor(
    public readonly options: RestaurantOptionsInput,
    public readonly currentUser: CurrentUserInfo,
  ) {
    if (currentUser.tenantId) {
      this.options.where = {
        ...this.options.where,
        tenantId: currentUser.tenantId,
      };
    }
  }
}
