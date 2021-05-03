import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { JwtUser } from '../../auths/jwts/jwt.strategy';
import { Content } from './content.entity';
import {
  NotificationServiceProvider,
  NotificationType,
  UpdateContentNotification,
} from '../../notifications/notifications/notifications.processor';

import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { CreateEpisodeDto } from '../episodes/dto/create-episode.dto';
import { UpdateEpisodeDto } from '../episodes/dto/update-episode.dto';
import { ContentQueryDto } from './dto/content-query.dto';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectQueue('notifications') private readonly notificationsQueue: Queue,
  ) {}

  async create(
    createContentDto: CreateContentDto,
    fileName: string,
  ): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: {
        name: createContentDto.name,
      },
    });

    if (content) {
      throw new HttpException('This name is used', HttpStatus.BAD_REQUEST);
    }

    this.notificationUpdateContent(
      createContentDto.name,
      createContentDto.episodes,
    );

    return this.contentRepository.save({
      ...createContentDto,
      imageFilename: fileName,
    });
  }

  findAll(
    query: ContentQueryDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Content>> {
    const contents = this.contentRepository.createQueryBuilder('content');
    contents.orderBy(`content.${query.key}`, query.orderType);

    if (query.search) {
      contents.where('content.name like :search', {
        search: `%${query.search}%`,
      });
    }

    return paginate<Content>(contents, options);
  }

  async findOne(contentId: number) {
    return this.contentRepository.findOneOrFail(contentId);
  }

  async updateOne(
    contentId: number,
    updateContentDto: UpdateContentDto,
    fileName: string,
  ): Promise<Content> {
    const content = await this.contentRepository.findOneOrFail(contentId);

    this.notificationUpdateContent(content.name, updateContentDto.episodes);

    return this.contentRepository.save({
      ...content,
      ...updateContentDto,
      imageFilename: fileName ? fileName : content.imageFilename,
    });
  }

  async deleteOne(contentId: number, user: JwtUser) {
    const content = await this.contentRepository.findOneOrFail(contentId);

    content.deletedBy = user.userId;
    content.deletedUser = user.userName;

    return this.contentRepository.softRemove(content);
  }

  private notificationUpdateContent(
    contentName: string,
    episodes: CreateEpisodeDto[] | UpdateEpisodeDto[],
  ) {
    //!@# link to client in the futher
    if (episodes.length) {
      for (const episode of episodes) {
        const notification: UpdateContentNotification = {
          serviceProvider: NotificationServiceProvider.LINE,
          type: NotificationType.UPDATE_CONTENT,
          contentName: contentName,
          episode: episode.name,
          link: '',
        };
        this.notificationsQueue.add('notifyUpdateContent', notification);
      }
    } else {
      const notification: UpdateContentNotification = {
        serviceProvider: NotificationServiceProvider.LINE,
        type: NotificationType.UPDATE_CONTENT,
        contentName: contentName,
        episode: '',
        link: '',
      };
      this.notificationsQueue.add('notifyUpdateContent', notification);
    }
  }
}
