import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../../infrastructure/prisma/prisma.module';
import { CustomerTenantResolver } from '../../resolvers/customer-tenant/customer-tenant.resolver';
import {
  CUSTOMER_TENANT_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../../../application/common/constants/tokens';
import { UserRepository } from '../../../infrastructure/repositories/user/user.repository';
import { CustomerTenantRepository } from '../../../infrastructure/repositories/customer-tentant/customer-tentant.repository';
import CreateCustomerBusinessHandler from '../../../application/commands/customer-tentant/create-customer-business/create-customer-business.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    PrismaModule,
    CustomerTenantResolver,
    CreateCustomerBusinessHandler,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: CUSTOMER_TENANT_TOKEN,
      useClass: CustomerTenantRepository,
    },
  ],
})
export class CustomerTentantModule {}
