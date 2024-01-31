import { MenuEntity } from './entities/menu.entity';

export class Menu extends MenuEntity {
  constructor(
    public name: string,
    public tenantId: string,
    public description?: string,
  ) {
    super();
  }
}
