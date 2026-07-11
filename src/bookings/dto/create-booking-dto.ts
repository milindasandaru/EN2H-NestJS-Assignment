import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(3)
  customerName: string;

  @ApiProperty({
    description: 'The email of the customer',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    example: '+1234567890',
  })
  @IsString()
  customerPhone: string;

  @ApiProperty({
    description: 'The date of the booking',
    example: '2023-10-10',
  })
  @IsDateString()
  bookingDate: string;

  @ApiProperty({
    description: 'The time of the booking',
    example: '10:00',
  })
  @IsString()
  bookingTime: string;

  @ApiProperty({
    description: 'Additional notes for the booking',
    example: 'Please arrive 10 minutes early.',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'The ID of the service for the booking',
    example: 1,
  })
  @IsInt()
  serviceId: number;
}
