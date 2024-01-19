import { MenuSectionsOptionsInput } from '../../../../domain/menu/dto/menu-section-query-options';
import { MenuSection } from '../../../../domain/menu/menu-section';

export interface IMenuSectionRepository {
  create(dto: MenuSection): Promise<MenuSection>;
  find(options?: MenuSectionsOptionsInput): Promise<MenuSection[]>;
}
