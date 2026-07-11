import {
  UseGuards,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking-dto';
import { UpdateBookingStatusDto } from './dto/update-booking.dto';
import { BookingService } from './booking.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BookingQueryDto } from './dto/booking-query.dto';
import { Query } from '@nestjs/common';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({
    summary: 'Create a booking',
  })
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all bookings',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: BookingQueryDto) {
    return this.bookingService.findAll(query);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get booking by ID',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update booking status',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateStatus(id, dto.status);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a booking',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.remove(id);
  }
}
