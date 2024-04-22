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
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto, UpdateDistrictDto } from './district.dto';
import { DistrictDocument } from './district.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptions, PaginationResult } from '../utils/pagination.util';

@ApiTags('Districts')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
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
  async findById(@Param('id') id: string): Promise<DistrictDocument> {
    const district = await this.districtService.findById(id);
    if (!district) {
      throw new NotFoundException('District not found');
    }
    return district;
  }

  @Post()
  async create(
    @Body() createDistrictDto: CreateDistrictDto,
  ): Promise<DistrictDocument> {
    return this.districtService.create(createDistrictDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ): Promise<DistrictDocument> {
    const existingDistrict = await this.districtService.findById(id);
    if (!existingDistrict) {
      throw new NotFoundException('District not found');
    }
    return this.districtService.update(id, updateDistrictDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DistrictDocument> {
    const existingDistrict = await this.districtService.findById(id);
    if (!existingDistrict) {
      throw new NotFoundException('District not found');
    }
    return this.districtService.delete(id);
  }
}
