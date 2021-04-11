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

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

}
