import { MenuSectionsOptionsInput } from '../../../../domain/menu/dto/menu-section-query-options';
import { MenuSection } from '../../../../domain/menu/menu-section';
import { IBaseRepository } from '../common/base-repository.interface';

export interface IMenuSectionRepository
  extends IBaseRepository<MenuSection, MenuSectionsOptionsInput> {
  create(dto: MenuSection): Promise<MenuSection>;
  find(options?: MenuSectionsOptionsInput): Promise<MenuSection[]>;
}
