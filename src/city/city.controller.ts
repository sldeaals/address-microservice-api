import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './city.dto';
import { CityDocument } from './city.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptions, PaginationResult } from '../utils/pagination.util';

@ApiTags('Cities')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll(
    @Query() query: PaginationOptions,
    @Query('name') name: string,
    @Query('countryCode') countryCode: string,
  ): Promise<PaginationResult<CityDocument[]>> {
    const filters = { name, countryCode };
    return this.cityService.searchPaginated(query, filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CityDocument> {
    const city = await this.cityService.findById(id);
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<CityDocument> {
    return this.cityService.create(createCityDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto): Promise<CityDocument> {
    const existingCity = await this.cityService.findById(id);
    if (!existingCity) {
      throw new NotFoundException('City not found');
    }
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CityDocument> {
    const existingCity = await this.cityService.findById(id);
    if (!existingCity) {
      throw new NotFoundException('City not found');
    }
    return this.cityService.delete(id);
  }
}
