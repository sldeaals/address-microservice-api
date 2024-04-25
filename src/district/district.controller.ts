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
import { DistrictService } from './district.service';
import { CreateDistrictDto, UpdateDistrictDto } from './district.dto';
import { DistrictDocument } from './district.entity';
import { ApiTags } from '@nestjs/swagger';
import {
  PaginationOptions,
  PaginationResult,
} from '../utils/common/pagination.util';
import { UserRole } from '../auth/auth.types';
import { RolesGuard } from '../auth/auth.roles.guard';
import { Roles } from '../utils/decorators/roles.decorator.util';

@ApiTags('Districts')
@UseGuards(RolesGuard)
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

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
    @Query('postalCode') postalCode: string,
    @Query('countryCode') countryCode: string,
  ): Promise<PaginationResult<DistrictDocument[]>> {
    const filters = { name, postalCode, countryCode };
    return this.districtService.searchPaginated(query, filters);
  }

  @Get(':id')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.TECH_SUPPORT,
    UserRole.CUSTOMER,
  )
  async findById(@Param('id') id: string): Promise<DistrictDocument> {
    const district = await this.districtService.findById(id);
    if (!district) {
      throw new NotFoundException('District not found');
    }
    return district;
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async create(
    @Body(new ValidationPipe()) createDistrictDto: CreateDistrictDto,
  ): Promise<DistrictDocument> {
    return this.districtService.create(createDistrictDto);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateDistrictDto: UpdateDistrictDto,
  ): Promise<DistrictDocument> {
    const existingDistrict = await this.districtService.findById(id);
    if (!existingDistrict) {
      throw new NotFoundException('District not found');
    }
    return this.districtService.update(id, updateDistrictDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  async delete(@Param('id') id: string): Promise<DistrictDocument> {
    const existingDistrict = await this.districtService.findById(id);
    if (!existingDistrict) {
      throw new NotFoundException('District not found');
    }
    return this.districtService.delete(id);
  }
}
