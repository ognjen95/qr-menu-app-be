import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { MenuSection } from '../../../domain/menu/menu-section';
import { IMenuSectionRepository } from '../../../application/common/interfaces/menu/menu-section-repository.interface';
import { MenuSectionsOptionsInput } from '../../../domain/menu/dto/menu-section-query-options';

@Injectable()
export class MenuSectionRepository implements IMenuSectionRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: MenuSection): Promise<MenuSection> {
    const createdMenu = await this.db.menuSection.create({
      data: {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        menuId: dto.menuId,
      },
    });

    return plainToInstance(MenuSection, createdMenu);
  }

  async find(options: MenuSectionsOptionsInput): Promise<MenuSection[]> {
    const foundMenus = await this.db.menuSection.findMany(options);

    return plainToInstance(MenuSection, foundMenus);
  }
}
