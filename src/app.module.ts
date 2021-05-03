import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import { ContentsModule } from './contents/contents.module';
import { ShopsModule } from './shops/shops.module';
import { ItemsModule } from './items/items.module';
import { LineGatewaysModule } from './line-gateways/line-gateways.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SentriesModule } from './sentries/sentries.module';
import { CatagoriesModule } from './catagories/catagories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', `${process.env.ASSET_PATH}`),
      serveRoot: `/${process.env.ASSET_PATH}`,
    }),
    UsersModule,
    AuthsModule,
    ContentsModule,
    ShopsModule,
    ItemsModule,
    LineGatewaysModule,
    NotificationsModule,
    SentriesModule,
    CatagoriesModule,
  ],
})
export class AppModule {}
