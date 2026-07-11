import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking-dto';
import { BookingStatus } from '@prisma/client';
import { BookingQueryDto } from './dto/booking-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    const service = await this.prisma.service.findUnique({
      where: {
        id: dto.serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${dto.serviceId} not found`);
    }

    const bookingDate = new Date(dto.bookingDate);

    if (bookingDate < new Date()) {
      throw new BadRequestException(`Booking date cannot be in the past`);
    }

    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        serviceId: dto.serviceId,
        bookingDate,
        bookingTime: dto.bookingTime,
      },
    });

    if (existingBooking) {
      throw new BadRequestException(`This time slot is already booked`);
    }

    return this.prisma.booking.create({
      data: {
        ...dto,
        bookingDate,
      },
    });
  }

  async findAll(query: BookingQueryDto) {
    const { page, limit, search, status } = query;

    const where: Prisma.BookingWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        {
          customerName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          customerEmail: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          customerPhone: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [bookings, total] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        where,
        include: {
          service: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          bookingDate: 'asc',
        },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      data: bookings,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async updateStatus(id: number, status: BookingStatus) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    if (
      booking.status === BookingStatus.CANCELLED &&
      status !== BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        `Cannot change status of a cancelled booking`,
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async remove(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}
