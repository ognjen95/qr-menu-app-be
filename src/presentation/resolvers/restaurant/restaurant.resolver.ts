import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateRestaurantInput } from '../../../domain/restaurant/dto/create-restaurant.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RestaurantEntity } from '../../../domain/restaurant/entities/restaurant.entity';
import { CurrentUserInfo } from '../auth/types';
import { CurrentUser } from '../../decorators/current-user';
import { CreateRestaurantCommand } from '../../../application/commands/restaurant/create-restaurant.command';
import { RestaurantOptionsInput } from '../../../domain/restaurant/dto/restaurant-query-options.input';
import { GetRestaurantsQuery } from '../../../application/queries/restaurant/get-restaurants.query';
import { RestaurantConnection } from '../../../domain/restaurant/entities/restaurant.connection';

@Resolver(() => RestaurantEntity)
export class RestaurantResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  async createRestaurant(
    @Args('args') args: CreateRestaurantInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return await this.commandBus.execute<CreateRestaurantCommand, string>(
      new CreateRestaurantCommand(args, currentUser),
    );
  }

  @Query(() => RestaurantConnection, { name: 'restaurants' })
  async findAll(
    @Args('options', { nullable: true })
    options: RestaurantOptionsInput = {},
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return await this.queryBus.execute<GetRestaurantsQuery, RestaurantEntity>(
      new GetRestaurantsQuery(options, currentUser),
    );
  }
}
