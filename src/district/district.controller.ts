import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto, UpdateDistrictDto } from './district.dto';
import { DistrictDocument } from './district.entity';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async findAll(): Promise<DistrictDocument[]> {
    return this.districtService.findAll();
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
