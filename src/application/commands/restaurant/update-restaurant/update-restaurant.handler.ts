import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRestaurantCommand } from './update-restaurant.command';
import { IRestaurantRepository } from '../../../common/interfaces/restaurant/restaurant-repository.interface';
import { Inject } from '@nestjs/common';
import { RESTAURANT_REPOSITORY_TOKEN } from '../../../common/constants/tokens';

@CommandHandler(UpdateRestaurantCommand)
class UpdateRestaurantHandler
  implements ICommandHandler<UpdateRestaurantCommand>
{
  constructor(
    @Inject(RESTAURANT_REPOSITORY_TOKEN)
    private readonly restaurantRepository: IRestaurantRepository,
  ) { }

  async execute({
    dto,
    currentUser,
  }: UpdateRestaurantCommand): Promise<string> {
    const [restaurant] = await this.restaurantRepository.find({
      where: { id: { equals: dto.id }, tenantId: currentUser.tenantId },
    });

    restaurant.menuId = dto.menuId;
    restaurant.location = dto.location;
    restaurant.name = dto.name;
    restaurant.description = dto.description;
    restaurant.image = dto.image;
    restaurant.menuId = dto.menuId;

    const updated = await this.restaurantRepository.update(restaurant);

    return updated.id;
  }
}

export default UpdateRestaurantHandler;
