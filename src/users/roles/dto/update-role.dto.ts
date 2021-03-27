import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ManagedLogDto } from 'src/managed-entities/managed-entities/dto/managed-log.dto';

export class UpdateRoleDto extends ManagedLogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
}
