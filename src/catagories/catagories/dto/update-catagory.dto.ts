import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ManagedLogDto } from 'src/managed-entities/managed-entities/dto/managed-log.dto';

export class UpdateCatagoryDto extends ManagedLogDto {
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty()
  readonly name: string;
  
}
