import { Module } from '@nestjs/common';
import { CatagoriesController } from './catagories/catagories.controller';
import { CatagoriesService } from './catagories/catagories.service';
import { Catagory } from './catagories/catagory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Catagory])],
  controllers: [CatagoriesController],
  providers: [CatagoriesService],
})
export class CatagoriesModule {}
