import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.service.findMany();
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
