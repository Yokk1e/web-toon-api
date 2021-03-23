import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { LineGatewaysService } from '../../line-gateways/line-gateways/line-gateways.service';
import { LineRegisterService } from '../../line-gateways/line-register/line-register.service';

export enum NotificationServiceProvider {
  LINE = 'line',
}

export enum NotificationType {
  UPDATE_CONTENT = 'update_content',
  LINE_REGISTER = 'line_register',
}

export declare type WebToonNotification = {
  serviceProvider: NotificationServiceProvider;
};

export declare type UpdateContentNotification = WebToonNotification & {
  type: NotificationType.UPDATE_CONTENT;
  contentName: string;
  episode: string;
  link: string;
};

export declare type LineRegisterNotification = WebToonNotification & {
  type: NotificationType.LINE_REGISTER;
  success: boolean;
  userId: string;
};

@Processor('notifications')
export class NotificationsProcessor {
  constructor(
    private readonly lineGatewaysService: LineGatewaysService,
    private readonly lineRegisterService: LineRegisterService,
  ) {}

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

  @Process('notifyContentUpdate')
  async notifyShopRegister(job: Job<UpdateContentNotification>) {
    const { serviceProvider, type, contentName, episode, link } = job.data;
    //!@# add direct linkn to client
    if (type === NotificationType.UPDATE_CONTENT) {
      if (serviceProvider === NotificationServiceProvider.LINE) {
        const message = episode
          ? `${contentName} ตอนที่ ${episode} มาแล้ว!`
          : `${contentName} มาแล้วโปรดติดตามเร็ว ๆ นี้`;

        const lineUsers = await this.lineRegisterService.findAll();
        const lineUserIds = lineUsers.map(user => {
          return user.userId;
        });

        for (const userId of lineUserIds) {
          await this.pushMessage(userId, message);
        }
      }
    }
  }
}
