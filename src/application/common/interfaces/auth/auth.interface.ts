import { UserRoles } from '../../../../domain/user/enums';

export interface IAuthService {
  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userRole: UserRoles,
    tenantId?: string,
  ): Promise<string>;
  authenticateUser(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    idToken: string;
  }>;
}
