import { MenuItemEntity, MenuItemVariant } from './entities/menu-item.entity';

export class MenuItem extends MenuItemEntity {
  constructor(
    public readonly name: string,
    public readonly menuSectionId: string,
    public readonly variants: MenuItemVariant[],
    public readonly description?: string,
  ) {
    super();
  }
}
