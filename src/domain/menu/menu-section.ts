import { MenuSectionEntity } from './entities/menu-section.entity';

export class MenuSection extends MenuSectionEntity {
  constructor(
    public readonly name: string,
    public readonly menuId: string,
    public readonly description?: string,
  ) {
    super();
  }
}
