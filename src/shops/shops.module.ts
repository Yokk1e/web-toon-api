import { Module } from '@nestjs/common';
import { ShopsController } from './shops/shops.controller';
import { ShopsService } from './shops/shops.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService]
})
export class ShopsModule {}
