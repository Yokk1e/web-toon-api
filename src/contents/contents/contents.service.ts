import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtUser } from '../../auths/jwts/jwt.strategy';
import { Content } from './content.entity';

import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

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
    return this.contentRepository.findOneOrFail(contentId, {
      where: { active: true },
    });
  }

  async updateOne(
    contentId: number,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    const content = await this.contentRepository.findOneOrFail(contentId, {
      where: { active: true },
    });

    return this.contentRepository.save({ ...content, ...updateContentDto });
  }

  async deleteOne(contentId: number, user: JwtUser) {
    const content = await this.contentRepository.findOneOrFail(contentId, {
      where: { active: true },
    });

    content.deletedBy = user.userId;
    content.deletedUser = user.userName;
    content.softDelete();

    return this.contentRepository.save(content);
  }
}
