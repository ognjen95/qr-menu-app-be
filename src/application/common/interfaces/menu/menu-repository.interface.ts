import { MenuOptionsInput } from '../../../../domain/menu/dto/menu-query-options.input';
import { Menu } from '../../../../domain/menu/menu';
import { IBaseRepository } from '../common/base-repository.interface';

export interface IMenuRepository
  extends IBaseRepository<Menu, MenuOptionsInput> {
  create(dto: Menu): Promise<Menu>;
  update(dto: Menu): Promise<Menu>;
  find(options?: MenuOptionsInput): Promise<Menu[]>;
  delete(id: string): Promise<Menu>;
}
