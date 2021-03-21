import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { LineGatewaysController } from './line-gateways/line-gateways.controller';
import { LineGatewaysService } from './line-gateways/line-gateways.service';
import { LineRegister } from './line-register/line-register.entity';
import { LineRegisterService } from './line-register/line-register.service';

@Global()
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
  controllers: [LineGatewaysController],
  providers: [LineGatewaysService, ConfigService, LineRegisterService],
  exports: [LineGatewaysService],
})
export class LineGatewaysModule {}
