import {
  IsNotEmpty,
  Length,
  IsInt,
  MinLength,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ManagedLogDto } from 'src/managed-entities/managed-entities/dto/managed-log.dto';

export class CreateEpisodeDto extends ManagedLogDto {
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty()
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly link: string;
}
