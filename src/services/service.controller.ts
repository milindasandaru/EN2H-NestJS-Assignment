import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ServiceQueryDto } from './dto/service-query.dto';
import { Query } from '@nestjs/common';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a service',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all services',
  })
  @Get()
  findAll(@Query() query: ServiceQueryDto) {
    return this.serviceService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get service by ID',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a service',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.serviceService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a service',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.remove(id);
  }
}
