import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query, UseGuards, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from './country.dto';
import { CountryDocument } from './country.entity';
import { PaginationOptions, PaginationResult } from '../utils/pagination.util';
import { UserRole } from '../auth/auth.types';
import { RolesGuard } from '../auth/auth.roles.guard';
import { Roles } from '../utils/decorators/roles.decorator.util';

@ApiTags('Countries')
@UseGuards(RolesGuard)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT, UserRole.CUSTOMER)
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
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT, UserRole.CUSTOMER)
  async findById(@Param('id') id: string): Promise<CountryDocument> {
    const country = await this.countryService.findById(id);
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return country;
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async create(@Body() createCountryDto: CreateCountryDto): Promise<CountryDocument> {
    return this.countryService.create(createCountryDto);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT)
  async update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto): Promise<CountryDocument> {
    const existingCountry = await this.countryService.findById(id);
    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }
    return this.countryService.update(id, updateCountryDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  async delete(@Param('id') id: string): Promise<CountryDocument> {
    const existingCountry = await this.countryService.findById(id);
    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }
    return this.countryService.delete(id);
  }
}
