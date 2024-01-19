import { CreateCustomerBusinessCommand } from './create-customer-business.command';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IUserRepository } from '../../../common/interfaces/user/user-repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  CUSTOMER_TENANT_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../../../common/constants/tokens';
import { UserRoles } from '../../../../domain/user/enums';
import { CustomerTenant } from '../../../../domain/customer-tentant/customer-tenant';
import { CreateUserCommand } from '../../user/create-user/create-user.command';
import { ICustomerTenantRepository } from '../../../common/interfaces/cusomter-tentant/customer-tenant-repository.interface';

@CommandHandler(CreateCustomerBusinessCommand)
class CreateCustomerBusinessHandler
  implements ICommandHandler<CreateCustomerBusinessCommand>
{
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(CUSTOMER_TENANT_TOKEN)
    private readonly customerTentant: ICustomerTenantRepository,

    private readonly commandBus: CommandBus,
  ) {}

  async execute({ dto }: CreateCustomerBusinessCommand): Promise<string> {
    const userExists = await this.userRepository.findOneByEmail(dto.email);

    if (userExists) {
      throw new BadRequestException('You can not create user');
    }

    const customerBusiness = new CustomerTenant(dto.name, dto.email);

    const createdCustomerBusiness = await this.customerTentant.create(
      customerBusiness,
    );

    dto.tenantId = createdCustomerBusiness.id;
    dto.userRole = UserRoles.CUSTOMER_OWNER;

    await this.commandBus.execute(new CreateUserCommand(dto));

    return createdCustomerBusiness.id;
  }
}

export default CreateCustomerBusinessHandler;
