import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ManagedEntitiesModule } from './managed-entities/managed-entities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    ManagedEntitiesModule,
    UsersModule,
  ],
})
export class AppModule {}
