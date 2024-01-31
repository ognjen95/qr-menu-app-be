import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRestaurantCommand } from './delete-restaurant.command';
import { IRestaurantRepository } from '../../../common/interfaces/restaurant/restaurant-repository.interface';
import { Inject } from '@nestjs/common';
import { RESTAURANT_REPOSITORY_TOKEN } from '../../../common/constants/tokens';

@CommandHandler(DeleteRestaurantCommand)
class DeleteRestaurantHandler
  implements ICommandHandler<DeleteRestaurantCommand>
{
  constructor(
    @Inject(RESTAURANT_REPOSITORY_TOKEN)
    private readonly restaurantRepository: IRestaurantRepository,
  ) { }

  async execute({ id }: DeleteRestaurantCommand): Promise<string> {
    const updated = await this.restaurantRepository.delete(id);

    return updated.id;
  }
}

export default DeleteRestaurantHandler;
