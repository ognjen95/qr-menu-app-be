import { Module } from '@nestjs/common';
import { UsersModule } from './presentation/modules/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './presentation/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './presentation/decorators/authorization-guard';
import { ChatModule } from './presentation/modules/chat/chat.module';
import { TasksModule } from './presentation/modules/tasks/tasks.module';
import { CustomerTentantModule } from './presentation/modules/customer-tenant/customer-tentant.module';
import { MenuModule } from './presentation/modules/menu/menu.module';
import { RestaurantModule } from './presentation/modules/restaurant/restaurant.module';
import { MenuSectionModule } from './presentation/modules/menu/menu-section.module';
import { MenuItemModule } from './presentation/modules/menu/menu-item.module';
import { FilesModule } from './presentation/modules/files.module';
import { ThemeConfigurationModule } from './presentation/modules/theme/theme-configuration.module';
import { ThemeSectionModule } from './presentation/modules/theme/theme-section.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UsersModule,
    AuthModule,
    ChatModule,
    TasksModule,
    CustomerTentantModule,
    MenuModule,
    RestaurantModule,
    MenuSectionModule,
    MenuItemModule,
    FilesModule,
    ThemeConfigurationModule,
    ThemeSectionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
