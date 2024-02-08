import { Injectable } from '@nestjs/common';
import { CreateThemeSectionInput } from '../domain/theme/theme-sections/dto/create-theme-section.input';
import { UpdateThemeSectionInput } from '../domain/theme/theme-sections/dto/update-theme-section.input';

@Injectable()
export class ThemeSectionService {
  create(createThemeSectionInput: CreateThemeSectionInput) {
    return 'This action adds a new themeSection';
  }

  findAll() {
    return `This action returns all themeSection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} themeSection`;
  }

  update(id: number, updateThemeSectionInput: UpdateThemeSectionInput) {
    return `This action updates a #${id} themeSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} themeSection`;
  }
}
