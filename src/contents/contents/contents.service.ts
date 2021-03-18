import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Content } from './content.entity';

import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: {
        name: createContentDto.name,
      },
    });

    if (content) {
      throw new HttpException('This name is used', HttpStatus.BAD_REQUEST);
    }

    return this.contentRepository.save({ ...createContentDto });
  }

  async findOne(contentId: number) {
    return this.contentRepository.findOneOrFail(contentId);
  }
}
