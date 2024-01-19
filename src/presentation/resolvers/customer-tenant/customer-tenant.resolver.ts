import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { CommandBus } from '@nestjs/cqrs';

import { IsPublic } from '@presentation/decorators/is-public';
import { CustomerTentantEntity } from '../../../domain/customer-tentant/entities/customer-tentant.entity';
import { CreateCustomerTentantInput } from '../../../domain/customer-tentant/dto/create-customer-tentant.input';
import { CreateCustomerBusinessCommand } from '../../../application/commands/customer-tentant/create-customer-business/create-customer-business.command';

@Resolver(() => CustomerTentantEntity)
export class CustomerTenantResolver {
  constructor(private commandBus: CommandBus) {}

  @IsPublic()
  @Mutation(() => String)
  async createCustomerBusiness(@Args('args') args: CreateCustomerTentantInput) {
    return await this.commandBus.execute(
      new CreateCustomerBusinessCommand(args),
    );
  }
}
