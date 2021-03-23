import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';
import { EpisodesController } from './episodes/episodes.controller';
import { EpisodesService } from './episodes/episodes.service';
import { Content } from './contents/content.entity';
import { Episode } from './episodes/episode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, Episode]),
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
  providers: [ContentsService, EpisodesService],
  controllers: [ContentsController, EpisodesController],
})
export class ContentsModule {}
