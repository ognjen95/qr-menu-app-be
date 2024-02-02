import { MenuEntity } from './entities/menu.entity';

export class Menu extends MenuEntity {
  constructor(
    public name: string,
    public tenantId: string,
    public description?: string,
  ) {
    super();
  }

  reorderSections = (
    menuSectionsIds: string[],
    positionIndex: number,
    newSectionId: string,
  ) => {
    const copy = [...menuSectionsIds];

    copy.splice(positionIndex, 0, newSectionId);

    this.menuSectionIds = copy;
  };

  removeSection = (id: string) => {
    this.menuSectionIds = this.menuSectionIds.filter(
      (menuSectionId) => menuSectionId !== id,
    );
  };
}
