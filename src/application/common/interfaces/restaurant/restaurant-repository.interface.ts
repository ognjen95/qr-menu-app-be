import { RestaurantOptionsInput } from '../../../../domain/restaurant/dto/restaurant-query-options.input';
import { Restaurant } from '../../../../domain/restaurant/restaurant';
import { IBaseRepository } from '../common/base-repository.interface';

export interface IRestaurantRepository
  extends IBaseRepository<Restaurant, RestaurantOptionsInput> {
  create(dto: Restaurant): Promise<Restaurant>;
  find(options?: RestaurantOptionsInput): Promise<Restaurant[]>;
}
