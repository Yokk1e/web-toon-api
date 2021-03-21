import { Module } from '@nestjs/common';
import { LineGatewaysController } from './line-gateways/line-gateways.controller';
import { LineGatewaysService } from './line-gateways/line-gateways.service';

@Module({
  controllers: [LineGatewaysController],
  providers: [LineGatewaysService]
})
export class LineGatewaysModule {}
