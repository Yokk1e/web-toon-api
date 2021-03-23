import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { LineGatewaysService } from '../../line-gateways/line-gateways/line-gateways.service';

export enum NotificationServiceProvider {
  LINE = 'line',
}

export enum NotificationType {
  CREATE_CONTENT = 'create_content',
  CREATE_EPISODE = 'create_episode',
  LINE_REGISTER = 'line_register',
}

export declare type WebToonNotification = {
  serviceProvider: NotificationServiceProvider;
};

export declare type CreateContentNotification = WebToonNotification & {
  type: NotificationType.CREATE_CONTENT;
  contentName: string;
};

export declare type LineRegisterNotification = WebToonNotification & {
  type: NotificationType.LINE_REGISTER;
  success: boolean;
  userId: string;
};

@Processor('notifications')
export class NotificationsProcessor {
  constructor(private readonly lineGatewaysService: LineGatewaysService) {}

  private async pushMessage(userId: string, message: string) {
    return await this.lineGatewaysService.pushMessage(userId, message);
  }

  @Process('notifyLineRegister')
  async notifyLineRegister(job: Job<LineRegisterNotification>) {
    const { serviceProvider, type, success, userId } = job.data;

    if (type === NotificationType.LINE_REGISTER) {
      if (serviceProvider === NotificationServiceProvider.LINE) {
        const message = success
          ? `Register สำเร็จ`
          : `ได้มีการ Register ไปแล้ว`;

        await this.pushMessage(userId, message);
      }
    }
  }

  @Process('notifyShopRegister')
  async notifyShopRegister(job: Job<LineRegisterNotification>) {
    const { serviceProvider, type, success, userId } = job.data;

    if (type === NotificationType.LINE_REGISTER) {
      if (serviceProvider === NotificationServiceProvider.LINE) {
        const message = success
          ? `Register สำเร็จ`
          : `ได้มีการ Register ไปแล้ว`;

        await this.pushMessage(userId, message);
      }
    }
  }
}
