import { RestaurantOptionsInput } from '../../../../domain/restaurant/dto/restaurant-query-options.input';
import { Restaurant } from '../../../../domain/restaurant/restaurant';

export interface IRestaurantRepository {
  create(dto: Restaurant): Promise<Restaurant>;
  find(options?: RestaurantOptionsInput): Promise<Restaurant[]>;
}
