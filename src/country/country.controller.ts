import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from './country.dto';
import { CountryDocument } from './country.entity';
import {
  PaginationOptions,
  PaginationResult,
} from '../utils/common/pagination.util';
import { UserRole } from '../auth/auth.types';
import { RolesGuard } from '../auth/auth.roles.guard';
import { Roles } from '../utils/decorators/roles.decorator.util';
import { CountryControllerSwagger } from '../swagger/country.swagger';

@ApiTags('Countries')
@UseGuards(RolesGuard)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOperation(CountryControllerSwagger.operations.findAll)
  @Get()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.TECH_SUPPORT,
    UserRole.CUSTOMER,
  )
  async findAll(
    @Query() query: PaginationOptions,
    @Query('name') name: string,
    @Query('cca2') cca2: string,
    @Query('cca3') cca3: string,
  ): Promise<PaginationResult<CountryDocument[]>> {
    const filters = { name, cca2, cca3 };
    return this.countryService.searchPaginated(query, filters);
  }

  @ApiOperation(CountryControllerSwagger.operations.findById)
  @Get(':id')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.TECH_SUPPORT,
    UserRole.CUSTOMER,
  )
  async findById(@Param('id') id: string): Promise<CountryDocument> {
    const country = await this.countryService.findById(id);
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return country;
  }

  @ApiOperation(CountryControllerSwagger.operations.create)
  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async create(
    @Body(new ValidationPipe()) createCountryDto: CreateCountryDto,
  ): Promise<CountryDocument> {
    return this.countryService.create(createCountryDto);
  }

  @ApiOperation(CountryControllerSwagger.operations.update)
  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCountryDto: UpdateCountryDto,
  ): Promise<CountryDocument> {
    const existingCountry = await this.countryService.findById(id);
    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }
    return this.countryService.update(id, updateCountryDto);
  }

  @ApiOperation(CountryControllerSwagger.operations.delete)
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
