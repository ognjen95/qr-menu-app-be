import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ThemeConfig } from '../../../domain/theme/theme-config';
import { themeConfigMapper } from './helpers';
import { IThemeRepository } from '../../../application/common/interfaces/theme/theme-repository.interface';

@Injectable()
export class ThemeRepository implements IThemeRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: ThemeConfig): Promise<ThemeConfig> {
    const data = themeConfigMapper(dto);

    console.log({ data, dto });

    const themeConfig = await this.db.themeConfig.create({
      data,
    });

    return plainToInstance(ThemeConfig, themeConfig);
  }

  async update(dto: ThemeConfig): Promise<ThemeConfig> {
    const updatedThemeConfig = await this.db.themeConfig.update({
      where: { id: dto.id },
      data: themeConfigMapper(dto),
    });

    return plainToInstance(ThemeConfig, updatedThemeConfig);
  }

  async findById(id: string): Promise<ThemeConfig> {
    const themeConfig = await this.db.themeConfig.findUnique({
      where: { id },
    });

    return plainToInstance(ThemeConfig, themeConfig);
  }

  find(options?: any): Promise<ThemeConfig[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<ThemeConfig> {
    throw new Error('Method not implemented.');
  }
}
