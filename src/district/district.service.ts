import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DistrictDocument } from './district.entity';
import { CityDocument } from '../city/city.entity';
import { CreateDistrictDto, UpdateDistrictDto } from './district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel('District')
    private readonly districtModel: Model<DistrictDocument>,

    @InjectModel('City')
    private readonly cityModel: Model<CityDocument>,
  ) {}

  async findAll(): Promise<DistrictDocument[]> {
    return this.districtModel.find().exec();
  }

  async findById(id: string): Promise<DistrictDocument> {
    return this.districtModel.findById(id).exec();
  }

  async create(
    createDistrictDto: CreateDistrictDto,
  ): Promise<DistrictDocument> {
    const city = await this.cityModel.findOne({
      cityId: createDistrictDto.cityId,
      countryCode: createDistrictDto.countryCode,
    }).exec();
  
    if (!city) {
      throw new Error('City not found');
    }

    const existingDistrict = city.districts.find(district => district.name === createDistrictDto.name);
    if (existingDistrict) {
      throw new Error('District already exists in the city');
    }

    const createdDistrict = new this.districtModel(createDistrictDto);

    city.districts.push(createdDistrict);

    if (createdDistrict.postalCode) {
      city.postalCodes.push(createdDistrict.postalCode);
    }

    await city.save();

    return createdDistrict.save();
  }

  async update(
    id: string,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<DistrictDocument> {
    return this.districtModel
      .findByIdAndUpdate(id, updateDistrictDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<DistrictDocument> {
    return this.districtModel.findByIdAndDelete(id).exec();
  }
}
