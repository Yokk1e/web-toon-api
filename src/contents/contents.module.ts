import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';
import { EpisodesController } from './episodes/episodes.controller';
import { EpisodesService } from './episodes/episodes.service';
import { Content } from './contents/content.entity';
import { Episode } from './episodes/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Episode])],
  providers: [ContentsService, EpisodesService],
  controllers: [ContentsController, EpisodesController],
})
export class ContentsModule {}
