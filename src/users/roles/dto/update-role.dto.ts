import { IsNotEmpty, IsString, IsInt, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ManagedLogDto } from 'src/managed-entities/managed-entities/dto/managed-log.dto';

export class UpdateRoleDto extends ManagedLogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsArray()
  @IsInt({ each: true })
  @ApiPropertyOptional({ type: [Number] })
  readonly permissions: number[];
}
