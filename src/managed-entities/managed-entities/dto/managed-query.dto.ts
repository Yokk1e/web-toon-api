import { IsOptional, IsBoolean, Min, IsNumber, IsEnum } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class ManagedQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(value => Number(value))
  @ApiPropertyOptional({ type: Number })
  readonly page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(value => Number(value))
  @ApiPropertyOptional({ type: Number })
  readonly limit: number = 10;

  @IsOptional()
  @ApiPropertyOptional({ type: String })
  readonly key: string = 'id';

  @IsOptional()
  @IsEnum(OrderType)
  @ApiPropertyOptional({
    type: 'enum',
    enum: OrderType,
    default: OrderType.ASC,
  })
  readonly orderType: OrderType;

  @IsOptional()
  @ApiPropertyOptional()
  readonly search: string;

  public orderBy(): any {
    return { [this.key]: this.orderType };
  }

  public orderByIdDesc(): any {
    return { id: 'DESC' };
  }
}
