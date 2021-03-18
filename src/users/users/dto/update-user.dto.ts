import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ManagedLogDto } from 'src/managed-entities/managed-entities/dto/managed-log.dto';

export class UpdateUserDto extends ManagedLogDto {
  @IsNotEmpty()
  @IsInt()
  @ApiPropertyOptional()
  readonly role: number;
}
