import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../../infrastructure/prisma/prisma.module';
import { RestaurantRepository } from '../../../infrastructure/repositories/restaurant/restaurant.repository';
import { RESTAURANT_REPOSITORY_TOKEN } from '../../../application/common/constants/tokens';
import { RestaurantResolver } from '../../resolvers/restaurant/restaurant.resolver';
import CreateRestaurantHandler from '../../../application/commands/restaurant/create-restaurant/create-restaurant.handler';
import GetRestaurantsHandler from '../../../application/queries/restaurant/get-restaurants.handler';
import UpdateRestaurantHandler from '../../../application/commands/restaurant/update-restaurant/update-restaurant.handler';
import DeleteRestaurantHandler from '../../../application/commands/restaurant/delete-restaurant/delete-restaurant.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    PrismaModule,
    RestaurantResolver,
    CreateRestaurantHandler,
    GetRestaurantsHandler,
    UpdateRestaurantHandler,
    DeleteRestaurantHandler,
    {
      provide: RESTAURANT_REPOSITORY_TOKEN,
      useClass: RestaurantRepository,
    },
  ],
})
export class RestaurantModule {}
