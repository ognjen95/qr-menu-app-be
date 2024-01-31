import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRestaurantCommand } from './create-restaurant.command';
import { IRestaurantRepository } from '../../common/interfaces/restaurant/restaurant-repository.interface';
import { Inject } from '@nestjs/common';
import { Restaurant } from '../../../domain/restaurant/restaurant';
import { RESTAURANT_REPOSITORY_TOKEN } from '../../common/constants/tokens';

@CommandHandler(CreateRestaurantCommand)
class CreateRestaurantHandler
  implements ICommandHandler<CreateRestaurantCommand>
{
  constructor(
    @Inject(RESTAURANT_REPOSITORY_TOKEN)
    private readonly restaurantRepository: IRestaurantRepository,
  ) { }

  async execute({
    dto,
    currentUser,
  }: CreateRestaurantCommand): Promise<string> {
    const restaurant = new Restaurant(
      dto.name,
      currentUser.tenantId,
      dto.description,
      dto.location,
      dto.image,
    );

    restaurant.menuId = dto.menuId;

    const createdRestaurant = await this.restaurantRepository.create(
      restaurant,
    );

    return createdRestaurant.id;
  }
}

export default CreateRestaurantHandler;
