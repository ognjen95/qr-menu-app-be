import { CustomerTenant } from '../../../../domain/customer-tentant/customer-tenant';

export interface ICustomerTenantRepository {
  create(dto: CustomerTenant): Promise<CustomerTenant>;
}
