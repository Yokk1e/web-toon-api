import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, TextMessage } from '@line/bot-sdk';


@Injectable()
export class LineGatewaysService {
    constructor(private readonly configService: ConfigService) {}

    getFollowerUserIds(client : Client){
        //This feature is available only for verified or premium accounts.
        //GET https://api.line.me/v2/bot/followers/ids
    }
}
