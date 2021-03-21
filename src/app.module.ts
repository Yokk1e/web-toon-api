import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ManagedEntitiesModule } from './managed-entities/managed-entities.module';
import { AuthsModule } from './auths/auths.module';
import { ContentsModule } from './contents/contents.module';
import { ShopsModule } from './shops/shops.module';
import { ItemsService } from './items/items/items.service';
import { ItemsController } from './items/items/items.controller';
import { ItemsModule } from './items/items.module';
import { LineGatewaysModule } from './line-gateways/line-gateways.module';

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
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class AppModule {}
