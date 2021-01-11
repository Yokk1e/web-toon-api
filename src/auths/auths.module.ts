import { Module } from '@nestjs/common';
import { AuthsController } from './auths/auths.controller';
import { AuthsService } from './auths/auths.service';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService]
})
export class AuthsModule {}
