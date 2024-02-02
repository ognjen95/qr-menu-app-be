import { MenuSectionEntity } from './entities/menu-section.entity';

export class MenuSection extends MenuSectionEntity {
  constructor(
    public name: string,
    public menuId: string,
    public description?: string,
  ) {
    super();
  }

  removeMenuItem(id: string): void {
    this.menuItemIds = this.menuItemIds.filter(
      (menuItemId) => menuItemId !== id,
    );
  }
}
