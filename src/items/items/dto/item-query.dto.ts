import {
  IsNotEmpty,
  Length,
  IsString,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ManagedQueryDto } from '../../../managed-entities/managed-entities/dto/managed-query.dto';

export class ItemQueryDto extends ManagedQueryDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional()
  readonly contentId: string;
}
