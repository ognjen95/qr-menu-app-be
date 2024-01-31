import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateRestaurantInput } from '../../../domain/restaurant/dto/create-restaurant.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RestaurantEntity } from '../../../domain/restaurant/entities/restaurant.entity';
import { CurrentUserInfo } from '../auth/types';
import { CurrentUser } from '../../decorators/current-user';
import { CreateRestaurantCommand } from '../../../application/commands/restaurant/create-restaurant/create-restaurant.command';
import { RestaurantOptionsInput } from '../../../domain/restaurant/dto/restaurant-query-options.input';
import { GetRestaurantsQuery } from '../../../application/queries/restaurant/get-restaurants.query';
import { RestaurantConnection } from '../../../domain/restaurant/entities/restaurant.connection';
import { UpdateRestaurantCommand } from '../../../application/commands/restaurant/update-restaurant/update-restaurant.command';
import { UpdateRestaurantInput } from '../../../domain/restaurant/dto/update-restaurant.input';
import { DeleteRestaurantCommand } from '../../../application/commands/restaurant/delete-restaurant/delete-restaurant.command';

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

  @Mutation(() => String)
  async updateRestaurant(
    @Args('args') args: UpdateRestaurantInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return await this.commandBus.execute<UpdateRestaurantCommand, string>(
      new UpdateRestaurantCommand(args, currentUser),
    );
  }

  @Mutation(() => String)
  async deleteRestaurant(
    @Args('id') id: string,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return await this.commandBus.execute<DeleteRestaurantCommand, string>(
      new DeleteRestaurantCommand(id, currentUser),
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
