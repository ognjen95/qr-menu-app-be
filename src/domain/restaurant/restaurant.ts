import { LocationEntity } from './entities/location.entity';
import { RestaurantEntity } from './entities/restaurant.entity';

export class Restaurant extends RestaurantEntity {
  constructor(
    public name: string,
    public tenantId: string,
    public description?: string,
    public location?: LocationEntity,
    public image?: string,
  ) {
    super();
  }
}
