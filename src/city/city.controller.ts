import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query, UseGuards, } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './city.dto';
import { CityDocument } from './city.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptions, PaginationResult } from '../utils/common/pagination.util';
import { UserRole } from '../auth/auth.types';
import { RolesGuard } from '../auth/auth.roles.guard';
import { Roles } from '../utils/decorators/roles.decorator.util';

@ApiTags('Cities')
@UseGuards(RolesGuard)
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT, UserRole.CUSTOMER)
  async findAll(
    @Query() query: PaginationOptions,
    @Query('name') name: string,
    @Query('countryCode') countryCode: string,
  ): Promise<PaginationResult<CityDocument[]>> {
    const filters = { name, countryCode };
    return this.cityService.searchPaginated(query, filters);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT, UserRole.CUSTOMER)
  async findById(@Param('id') id: string): Promise<CityDocument> {
    const city = await this.cityService.findById(id);
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async create(@Body() createCityDto: CreateCityDto): Promise<CityDocument> {
    return this.cityService.create(createCityDto);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT)
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto): Promise<CityDocument> {
    const existingCity = await this.cityService.findById(id);
    if (!existingCity) {
      throw new NotFoundException('City not found');
    }
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  async delete(@Param('id') id: string): Promise<CityDocument> {
    const existingCity = await this.cityService.findById(id);
    if (!existingCity) {
      throw new NotFoundException('City not found');
    }
    return this.cityService.delete(id);
  }
}
