import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LineRegisterService } from '../line-register/line-register.service';

@ApiTags('line-gateways')
@Controller('line-gateways')
export class LineGatewaysController {
  constructor(private readonly lineRegisterService: LineRegisterService) {}

  @Post()
  @HttpCode(200)
  async getMessage(@Body() message: any) {
    console.log(JSON.stringify(message));

    const eventMessage = message.events[0];
    if (eventMessage.message.text.toLowerCase() === 'register') {
      try {
        this.lineRegisterService.register(eventMessage.source.userId);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
