import {
  IsNotEmpty,
  Length,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type, Transform, plainToClass } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ManagedLogDto } from 'src/managed-entities/managed-entities/dto/managed-log.dto';
import { UpdateEpisodeDto } from '../../episodes/dto/update-episode.dto';

export class UpdateContentDto extends ManagedLogDto {
  @IsOptional()
  @Length(1, 255)
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsOptional()
  @Transform(
    episodes => plainToClass(UpdateEpisodeDto, JSON.parse(episodes.value)),
    { toClassOnly: true },
  )
  @ValidateNested({ each: true })
  @Type(() => UpdateEpisodeDto)
  @ApiPropertyOptional({ type: [UpdateEpisodeDto] })
  readonly episodes: UpdateEpisodeDto[];
}
