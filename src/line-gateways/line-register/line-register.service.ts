import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import {
  NotificationServiceProvider,
  NotificationType,
  LineRegisterNotification,
} from '../../notifications/notifications/notifications.processor';
import { LineRegister } from './line-register.entity';

@Injectable()
export class LineRegisterService {
  constructor(
    @InjectRepository(LineRegister)
    private readonly lineRegisterRepository: Repository<LineRegister>,
    @InjectQueue('notifications') private readonly notificationsQueue: Queue,
  ) {}

  async register(userId: string) {
    let success = false;
    try {
      await this.lineRegisterRepository.save({ userId });
      success = true;
    } catch (error) {
      success = false;
    } finally {
      const notification: LineRegisterNotification = {
        serviceProvider: NotificationServiceProvider.LINE,
        type: NotificationType.LINE_REGISTER,
        success,
        userId,
      };

      this.notificationsQueue.add('notifyLineRegister', notification);
    }

    return this.lineRegisterRepository.save({ userId });
  }

  async findAll(): Promise<LineRegister[]> {
    return this.lineRegisterRepository.find();
  }
}
