import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from './country.dto';
import { CountryDocument } from './country.entity';
import { PaginationOptions, PaginationResult } from '../utils/pagination.util';

@ApiTags('Countries')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(
    @Query() query: PaginationOptions,
    @Query('name') name: string,
    @Query('cca2') cca2: string,
    @Query('cca3') cca3: string,
  ): Promise<PaginationResult<CountryDocument[]>> {
    const filters = { name, cca2, cca3 };
    return this.countryService.searchPaginated(query, filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CountryDocument> {
    const country = await this.countryService.findById(id);
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return country;
  }

  @Post()
  async create(@Body() createCountryDto: CreateCountryDto): Promise<CountryDocument> {
    return this.countryService.create(createCountryDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto): Promise<CountryDocument> {
    const existingCountry = await this.countryService.findById(id);
    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }
    return this.countryService.update(id, updateCountryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CountryDocument> {
    const existingCountry = await this.countryService.findById(id);
    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }
    return this.countryService.delete(id);
  }
}
