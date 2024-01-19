import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../../infrastructure/prisma/prisma.module';
import { RestaurantRepository } from '../../../infrastructure/repositories/restaurant/restaurant.repository';
import { RESTAURANT_REPOSITORY_TOKEN } from '../../../application/common/constants/tokens';
import { RestaurantResolver } from '../../resolvers/restaurant/restaurant.resolver';
import CreateRestaurantHandler from '../../../application/commands/restaurant/create-restaurant.handler';
import GetRestaurantsHandler from '../../../application/queries/restaurant/get-restaurants.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    PrismaModule,
    RestaurantResolver,
    CreateRestaurantHandler,
    GetRestaurantsHandler,
    {
      provide: RESTAURANT_REPOSITORY_TOKEN,
      useClass: RestaurantRepository,
    },
  ],
})
export class RestaurantModule {}
