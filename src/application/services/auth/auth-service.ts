import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { IAuthService } from '@application/common/interfaces/auth/auth.interface';
import { decode, sign } from 'jsonwebtoken';
import { USER_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { UserRepository } from '@infrastructure/repositories/user/user.repository';

@Injectable()
export class AuthService implements IAuthService {
  private userPool = new CognitoUserPool({
    // UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    UserPoolId: 'ap-southeast-2_WjIfvco18',
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
  });

  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    // userRole: UserRoles,
    // tenantId?: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'given_name',
            Value: firstName,
          }),
          new CognitoUserAttribute({
            Name: 'family_name',
            Value: lastName,
          }),
          // new CognitoUserAttribute({
          //   Name: 'role',
          //   Value: userRole,
          // }),
          // new CognitoUserAttribute({
          //   Name: 'tenantId',
          //   Value: tenantId,
          // }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.userSub);
          }
        },
      );
    });
  }

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    idToken: string;
  }> {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: async (result) => {
          const idToken = result.getIdToken().decodePayload();
          const accessToken = result.getAccessToken().getJwtToken();
          const decodedAccessToken = decode(accessToken, {
            json: true,
          });

          if (!decodedAccessToken) {
            throw new UnauthorizedException('Unable to login');
          }

          const user = await this.userRepository.findOneByExternalId(
            decodedAccessToken.sub,
          );

          idToken.userRole = user.userRole;

          const newIdToken = sign(idToken, process.env.JWT_SECRET);

          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
            idToken: newIdToken,
          });
        },
        onFailure: (error) => {
          throw new UnauthorizedException(error.message ?? 'Unable to login');
        },
      });
    });
  }

  async refreshToken(
    idToken: string,
    accessToken: string,
    refreshToken: string,
    email: string,
  ): Promise<any> {
    const AccessToken = new CognitoAccessToken({
      AccessToken: accessToken,
    });

    const IdToken = new CognitoIdToken({ IdToken: idToken });
    const RefreshToken = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });

    const sessionData = {
      IdToken: IdToken,
      AccessToken: AccessToken,
      RefreshToken: RefreshToken,
    };

    const userSession = new CognitoUserSession(sessionData);

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.setSignInUserSession(userSession);

    cognitoUser.getSession(function (err, session) {
      // You must run this to verify that session (internally)
      if (session.isValid()) {
        // Update attributes or whatever else you want to do
      } else {
        // TODO: What to do if session is invalid?
      }
    });
  }
}
