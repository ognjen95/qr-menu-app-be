import { MenuItem } from '../../../../domain/menu/menu-item';

export interface IMenuItemRepository {
  create(dto: MenuItem): Promise<MenuItem>;
  find(options?: any): Promise<MenuItem[]>;
}
