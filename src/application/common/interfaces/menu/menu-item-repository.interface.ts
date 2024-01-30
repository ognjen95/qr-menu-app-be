import { MenuItemOptionsInput } from '../../../../domain/menu/dto/menu-item-options.input';
import { MenuItem } from '../../../../domain/menu/menu-item';

export interface IMenuItemRepository {
  update(dto: MenuItem): Promise<MenuItem>;
  create(dto: MenuItem): Promise<MenuItem>;
  find(options?: MenuItemOptionsInput): Promise<MenuItem[]>;
  delete(id: string): Promise<MenuItem>;
}
