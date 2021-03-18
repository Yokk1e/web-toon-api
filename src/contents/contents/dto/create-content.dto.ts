import {
  IsNotEmpty,
  Length,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ManagedLogDto } from 'src/managed-entities/managed-entities/dto/managed-log.dto';
import { CreateEpisodeDto } from '../../episodes/dto/create-episode.dto';

export class CreateContentDto extends ManagedLogDto {
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEpisodeDto)
  @ApiPropertyOptional({ type: [CreateEpisodeDto] })
  readonly episodes: CreateEpisodeDto[];
}
