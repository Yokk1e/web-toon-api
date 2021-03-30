import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import { ContentsModule } from './contents/contents.module';
import { ShopsModule } from './shops/shops.module';
import { ItemsModule } from './items/items.module';
import { LineGatewaysModule } from './line-gateways/line-gateways.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SentriesModule } from './sentries/sentries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    UsersModule,
    AuthsModule,
    ContentsModule,
    ShopsModule,
    ItemsModule,
    LineGatewaysModule,
    NotificationsModule,
    SentriesModule,
  ],
})
export class AppModule {}
