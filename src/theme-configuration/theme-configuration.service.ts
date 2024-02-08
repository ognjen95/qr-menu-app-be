import { Injectable } from '@nestjs/common';
import { CreateThemeConfigurationInput } from '../domain/theme/theme-config/dto/create-theme-configuration.input';
import { UpdateThemeConfigurationInput } from '../domain/theme/theme-config/dto/update-theme-configuration.input';

@Injectable()
export class ThemeConfigurationService {
  create(createThemeConfigurationInput: CreateThemeConfigurationInput) {
    return 'This action adds a new themeConfiguration';
  }

  findAll() {
    return `This action returns all themeConfiguration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} themeConfiguration`;
  }

  update(id: number, updateThemeConfigurationInput: UpdateThemeConfigurationInput) {
    return `This action updates a #${id} themeConfiguration`;
  }

  remove(id: number) {
    return `This action removes a #${id} themeConfiguration`;
  }
}
