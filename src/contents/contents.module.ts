import { Module } from '@nestjs/common';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';

@Module({
  providers: [ContentsService],
  controllers: [ContentsController]
})
export class ContentsModule {}
