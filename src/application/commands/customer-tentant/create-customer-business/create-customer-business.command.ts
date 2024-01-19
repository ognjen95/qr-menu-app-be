import { ICommand } from '@nestjs/cqrs';
import { CreateCustomerTentantInput } from '../../../../domain/customer-tentant/dto/create-customer-tentant.input';

export class CreateCustomerBusinessCommand implements ICommand {
  constructor(public readonly dto: CreateCustomerTentantInput) {}
}
