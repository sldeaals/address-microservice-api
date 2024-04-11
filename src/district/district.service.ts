import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DistrictDocument } from './district.entity';
import { CreateDistrictDto, UpdateDistrictDto } from './district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel('District')
    private readonly districtModel: Model<DistrictDocument>,
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
    const createdDistrict = new this.districtModel(createDistrictDto);
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
