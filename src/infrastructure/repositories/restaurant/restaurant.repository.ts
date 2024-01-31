import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { IRestaurantRepository } from '../../../application/common/interfaces/restaurant/restaurant-repository.interface';
import { Restaurant } from '../../../domain/restaurant/restaurant';
import { RestaurantOptionsInput } from '../../../domain/restaurant/dto/restaurant-query-options.input';

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: Restaurant): Promise<Restaurant> {
    const createRestaurant = await this.db.restaurant.create({
      data: {
        id: dto.id,
        name: dto.name,
        tenantId: dto.tenantId,
        description: dto.description,
        location: dto.location,
        image: dto.image,
        menuId: dto.menuId,
      },
    });

    return plainToInstance(Restaurant, createRestaurant);
  }

  async find(options: RestaurantOptionsInput): Promise<Restaurant[]> {
    const findRestaurants = await this.db.restaurant.findMany(options);

    return plainToInstance(Restaurant, findRestaurants);
  }

  async update(dto: Restaurant): Promise<Restaurant> {
    const updatedRestaurant = await this.db.restaurant.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        description: dto.description,
        location: dto.location,
        image: dto.image,
        menuId: dto.menuId,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(Restaurant, updatedRestaurant);
  }

  async delete(id: string): Promise<Restaurant> {
    const deletedRestaurant = await this.db.restaurant.delete({
      where: { id },
    });

    return plainToInstance(Restaurant, deletedRestaurant);
  }
}
