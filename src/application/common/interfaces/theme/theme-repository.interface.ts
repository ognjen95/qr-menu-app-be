import { ThemeConfig } from '../../../../domain/theme/theme-config';
import { IBaseRepository } from '../common/base-repository.interface';

export interface IThemeRepository extends IBaseRepository<ThemeConfig, any> {
  findById(id?: string): Promise<ThemeConfig>;
}
