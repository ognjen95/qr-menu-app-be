import { Module } from '@nestjs/common';
import { UsersResolver } from '../../resolvers/users/users.resolver';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import CreateUserHandler from '@application/commands/user/create-user/create-user.handler';
import { UserRepository } from '@infrastructure/repositories/user/user.repository';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import FindAllUsersHandler from '@application/queries/users/find-all/find-all-users.handler';
import {
  AUTH_SERVICE_TOKEN,
  CHAT_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import FindUserByIdQueryHandler from '@application/queries/users/find-user-by-id/find-user-by-id.handler';
import UpdateUserHandler from '@application/commands/user/update-user/update-user.handler';
import RemoveUserHandler from '@application/commands/user/remove-user/remove-user.handler';
import { AuthService } from '@application/services/auth/auth-service';
import { ChatService } from '@application/services/chat/chat-service';

@Module({
  imports: [CqrsModule],
  providers: [
    PrismaModule,
    UsersResolver,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
    {
      provide: CHAT_SERVICE_TOKEN,
      useClass: ChatService,
    },
    AuthService,
    CreateUserHandler,
    UpdateUserHandler,
    FindAllUsersHandler,
    RemoveUserHandler,
    FindUserByIdQueryHandler,
  ],
})
export class UsersModule {}
