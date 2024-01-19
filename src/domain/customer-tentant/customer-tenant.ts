import { CustomerTentantEntity } from './entities/customer-tentant.entity';

export class CustomerTenant extends CustomerTentantEntity {
  constructor(public readonly name: string, public readonly email: string) {
    super();
  }
}
