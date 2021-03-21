import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ManagedEntitiesModule } from './managed-entities/managed-entities.module';
import { AuthsModule } from './auths/auths.module';
import { ContentsModule } from './contents/contents.module';
import { ShopsModule } from './shops/shops.module';
import { ItemsModule } from './items/items.module';
import { LineGatewaysModule } from './line-gateways/line-gateways.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    ManagedEntitiesModule,
    UsersModule,
    AuthsModule,
    ContentsModule,
    ShopsModule,
    ItemsModule,
    LineGatewaysModule,
    NotificationsModule,
  ],
})
export class AppModule {}
