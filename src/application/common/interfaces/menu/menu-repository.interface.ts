import { Menu } from '../../../../domain/menu/menu';

export interface IMenuRepository {
  create(dto: Menu): Promise<Menu>;
  find(options?: any): Promise<Menu[]>;
}
