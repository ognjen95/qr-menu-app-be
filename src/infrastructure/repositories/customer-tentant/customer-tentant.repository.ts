import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CustomerTenant } from '../../../domain/customer-tentant/customer-tenant';
import { ICustomerTenantRepository } from '../../../application/common/interfaces/cusomter-tentant/customer-tenant-repository.interface';

@Injectable()
export class CustomerTenantRepository implements ICustomerTenantRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: CustomerTenant): Promise<CustomerTenant> {
    const createTenant = await this.db.customerTenant.create({
      data: {
        id: dto.id,
        name: dto.name,
        email: dto.email,
      },
    });

    return plainToInstance(CustomerTenant, createTenant);
  }
}
