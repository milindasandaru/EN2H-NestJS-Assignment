import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'The title of the service',
    example: 'Haircut',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'The description of the service',
    example: 'A professional haircut with styling',
  })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({
    description: 'The duration of the service in minutes',
    example: 30,
  })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty({
    description: 'The price of the service',
    example: 25.99,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Whether the service is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
