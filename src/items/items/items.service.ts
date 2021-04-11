import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Item } from '../items/items.entity';
import { Content } from '../../contents/contents/content.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemQueryDto } from './dto/item-query.dto';

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

  findAll(
    query: ItemQueryDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Item>> {
    const items = this.itemRepository.createQueryBuilder('item');

    if (query.search) {
      items.where('item.name like :search', {
        search: `%${query.search}%`,
      });
    }

    if (query.contentId) {
      items.where('item.contentId = :contentId', {
        contentId: query.contentId,
      });
    }

    return paginate<Item>(items, options);
  }

  async findOne(id: number, query: ItemQueryDto): Promise<Item> {
    return this.itemRepository.findOneOrFail(id, {
      relations: ['content'],
    });
  }

  async updateOne(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const oldItem = await this.itemRepository.findOneOrFail(id, {
      relations: ['content'],
    });

    const item = await this.itemRepository.findOne({
      where: {
        name: updateItemDto.name,
        id: Not(oldItem.id),
        content: oldItem.content,
      },
    });

    if (item)
      throw new HttpException('Item is already exist', HttpStatus.BAD_REQUEST);

    return this.itemRepository.save({ ...oldItem, ...updateItemDto });
  }

  async deleteOne(id: number) {
    return this.itemRepository.softDelete(id);
  }
}
