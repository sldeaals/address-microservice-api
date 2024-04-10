import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from './country.dto';
import { CountryDocument } from './country.entity';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(): Promise<CountryDocument[]> {
    return this.countryService.findAll();
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
