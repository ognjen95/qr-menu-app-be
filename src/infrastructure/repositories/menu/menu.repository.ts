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
      },
    });

    return plainToInstance(Menu, createdMenu);
  }

  async find(options: MenuOptionsInput): Promise<Menu[]> {
    const foundMenus = await this.db.menu.findMany(options);

    return plainToInstance(Menu, foundMenus);
  }
}
