import {
    IsNotEmpty,
    Length,
    IsString,
    ValidateNested,
    IsOptional,
    IsNumber,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  import { ManagedLogDto } from 'src/managed-entities/managed-entities/dto/managed-log.dto';
  
  export class UpdateItemDto extends ManagedLogDto {
    @IsNotEmpty()
    @Length(1, 255)
    @ApiProperty()
    readonly name: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    @ApiProperty()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    readonly price: number;
}