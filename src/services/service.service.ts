import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceQueryDto } from './dto/service-query.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: dto,
    });
  }

  async findAll(query: ServiceQueryDto) {
    const { page, limit } = query;

    const services = await this.prisma.service.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prisma.service.count();

    return {
      data: services,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.prisma.service.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.service.delete({
      where: {
        id,
      },
    });
  }
}
