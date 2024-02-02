import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { IMenuRepository } from '../../../application/common/interfaces/menu/menu-repository.interface';
import { Menu } from '../../../domain/menu/menu';
import { MenuOptionsInput } from '../../../domain/menu/dto/menu-query-options.input';

@Injectable()
export class MenuRepository implements IMenuRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: Menu): Promise<Menu> {
    const createdMenu = await this.db.menu.create({
      data: {
        id: dto.id,
        name: dto.name,
        tenantId: dto.tenantId,
        description: dto.description,
        isVisible: dto.isVisible,
        menuSectionIds: dto.menuSectionIds,
      },
    });

    return plainToInstance(Menu, createdMenu);
  }

  async find(options: MenuOptionsInput): Promise<Menu[]> {
    const foundMenus = await this.db.menu.findMany(options);

    return plainToInstance(Menu, foundMenus);
  }

  async update(dto: Menu): Promise<Menu> {
    const updatedMenu = await this.db.menu.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        description: dto.description,
        isVisible: dto.isVisible,
        menuSectionIds: dto.menuSectionIds,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(Menu, updatedMenu);
  }

  async delete(id: string): Promise<Menu> {
    const deletedMenu = await this.db.menu.delete({ where: { id } });

    return plainToInstance(Menu, deletedMenu);
  }
}
