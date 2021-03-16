import { Module } from '@nestjs/common';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';
import { EpisodesController } from './episodes/episodes.controller';
import { EpisodesService } from './episodes/episodes.service';

@Module({
  providers: [ContentsService, EpisodesService],
  controllers: [ContentsController, EpisodesController]
})
export class ContentsModule {}
