import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { IMenuItemRepository } from '../../../application/common/interfaces/menu/menu-item-repository.interface';
import { MenuItem } from '../../../domain/menu/menu-item';
import { MenuItemOptionsInput } from '../../../domain/menu/dto/menu-item-options.input';

@Injectable()
export class MenuItemRepository implements IMenuItemRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: MenuItem): Promise<MenuItem> {
    const createdMenuItem = await this.db.menuItem.create({
      data: {
        id: dto.id,
        name: dto.name,
        variants: dto.variants,
        description: dto.description,
        sectionId: dto.menuSectionId,
      },
    });

    return plainToInstance(MenuItem, createdMenuItem);
  }

  async find(options: MenuItemOptionsInput): Promise<MenuItem[]> {
    const menuItems = await this.db.menuItem.findMany(options);

    return plainToInstance(MenuItem, menuItems);
  }
}
