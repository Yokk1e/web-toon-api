import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Header,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemQueryDto } from './dto/item-query.dto';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  findAll(@Query() query: ItemQueryDto) {
    const options = { limit: query.limit, page: query.page };

    return this.itemsService.findAll(query, options);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-cache, no-store')
  findOne(@Param('id') id: number, @Query() query: ItemQueryDto) {
    return this.itemsService.findOne(id, query);
  }

  @Patch(':id')
  updateOne(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.updateOne(id, updateItemDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.itemsService.deleteOne(id);
  }
}
