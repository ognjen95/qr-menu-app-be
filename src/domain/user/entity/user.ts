import { UserRoles } from '../enums';
import { UserEntity } from './user.entity';

export class User extends UserEntity {
  constructor(
    public firstName: string,

    public middleName: string,

    public lastName: string,

    public email: string,

    public userRole: UserRoles,
  ) {
    super();
  }
}
