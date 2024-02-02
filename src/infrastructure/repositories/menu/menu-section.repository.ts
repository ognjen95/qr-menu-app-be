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
        menuItemIds: dto.menuItemIds,
      },
    });

    return plainToInstance(MenuSection, createdMenu);
  }

  async update(dto: MenuSection): Promise<MenuSection> {
    const updatedMenu = await this.db.menuSection.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        description: dto.description,
        menuId: dto.menuId,
        menuItemIds: dto.menuItemIds,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(MenuSection, updatedMenu);
  }

  async find(options: MenuSectionsOptionsInput): Promise<MenuSection[]> {
    const foundMenus = await this.db.menuSection.findMany(options);

    return plainToInstance(MenuSection, foundMenus);
  }

  async delete(id: string): Promise<MenuSection> {
    const deletedMenu = await this.db.menuSection.delete({ where: { id } });

    return plainToInstance(MenuSection, deletedMenu);
  }
}
