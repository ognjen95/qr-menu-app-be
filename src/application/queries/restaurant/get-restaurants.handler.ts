import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRestaurantsQuery } from './get-restaurants.query';
import { IRestaurantRepository } from '../../common/interfaces/restaurant/restaurant-repository.interface';
import { Restaurant } from '../../../domain/restaurant/restaurant';
import { Inject } from '@nestjs/common';
import { RESTAURANT_REPOSITORY_TOKEN } from '../../common/constants/tokens';
import { Connection, connectionFromArray } from 'graphql-relay';

@QueryHandler(GetRestaurantsQuery)
class GetRestaurantsHandler implements IQueryHandler<GetRestaurantsQuery> {
  constructor(
    @Inject(RESTAURANT_REPOSITORY_TOKEN)
    private readonly restaurantRepository: IRestaurantRepository,
  ) { }

  async execute({
    options,
  }: GetRestaurantsQuery): Promise<Connection<Restaurant>> {
    const restaurants = await this.restaurantRepository.find(options);

    console.log({ options, restaurants })

    return connectionFromArray(restaurants, {});
  }
}

export default GetRestaurantsHandler;
