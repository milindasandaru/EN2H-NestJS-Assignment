import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsInt,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @MinLength(3)
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsString()
  customerPhone: string;

  @IsDateString()
  bookingDate: string;

  @IsString()
  bookingTime: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  serviceId: number;
}
