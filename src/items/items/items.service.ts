import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/items.entity';
import { Content } from '../../contents/contents/content.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const content = await this.contentRepository.findOneOrFail(
      createItemDto.contentId,
    );

    const item = await this.itemRepository.findOne({
      where: { name: createItemDto.name, content },
    });

    if (item)
      throw new HttpException('Item is already exist', HttpStatus.BAD_REQUEST);

    return this.itemRepository.save({ ...createItemDto, content });
  }
}
