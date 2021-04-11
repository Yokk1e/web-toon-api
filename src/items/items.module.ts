import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from './items/items.entity';
import { Content } from '../contents/contents/content.entity';

import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Content])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
