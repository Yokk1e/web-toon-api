import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LineRegister } from '../line-gateways/line-register/line-register.entity';
import { NotificationsProcessor } from './notifications/notifications.processor';
import { LineRegisterService } from '../line-gateways/line-register/line-register.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LineRegister]),
    BullModule.registerQueueAsync({
      name: 'notifications',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIST_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NotificationsProcessor, LineRegisterService],
})
export class NotificationsModule {}
