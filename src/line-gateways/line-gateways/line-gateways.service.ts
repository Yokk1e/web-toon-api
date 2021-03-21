import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, TextMessage } from '@line/bot-sdk';

@Injectable()
export class LineGatewaysService {
  constructor(private readonly configService: ConfigService) {}

  getFollowerUserIds(client: Client) {
    //This feature is available only for verified or premium accounts.
    //GET https://api.line.me/v2/bot/followers/ids
  }

  async pushMessage(userId: string, text: string) {
    const channelAccessToken = this.configService.get('LINE_BOT_ACCESS_TOKEN');
    const channelSecret = this.configService.get('LINE_BOT_SECRET');

    const client = new Client({
      channelAccessToken,
      channelSecret,
    });

    const textMessage: TextMessage = {
      type: 'text',
      text,
    };

    return await client.pushMessage(userId, textMessage);
  }
}
