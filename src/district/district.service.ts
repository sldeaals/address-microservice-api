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
    const city = await this.cityModel
      .findOne({
        cityId: createDistrictDto.cityId,
        countryCode: createDistrictDto.countryCode,
      })
      .exec();

    if (!city) {
      throw new Error('City not found');
    }

    const existingDistrict = city.districts.find(
      (district) => district.name === createDistrictDto.name,
    );
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
    const { cityId, countryCode } = updateDistrictDto;

    if (!cityId || !countryCode) {
      throw new Error('cityId and countryCode are required');
    }

    const city = await this.cityModel.findOne({ cityId, countryCode }).exec();

    if (!city) {
      throw new Error(
        `City with cityId ${cityId} and countryCode ${countryCode} not found`,
      );
    }

    const currDistrict = await this.districtModel.findOne({ _id: id }).exec();

    if (!currDistrict) {
      throw new Error(`District with id ${id} not found`);
    }

    const cityDistricts = city.districts.filter(
      (_district) =>
        _district.countryCode !== currDistrict.countryCode &&
        _district.cityId !== currDistrict.cityId &&
        _district.name !== currDistrict.name &&
        _district.postalCode !== currDistrict.postalCode,
    );
    const cityPostalCodes = city.postalCodes.filter(
      (_postalCodes) => _postalCodes !== currDistrict.postalCode,
    );

    cityDistricts.push(updateDistrictDto);
    cityPostalCodes.push(updateDistrictDto.postalCode);
    city.districts = cityDistricts;
    city.postalCodes = cityPostalCodes;

    await city.save();

    return this.districtModel
      .findByIdAndUpdate(id, updateDistrictDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<DistrictDocument> {
    const district = await this.districtModel.findById(id).exec();

    if (!district) {
      throw new Error('District not found');
    }

    const { cityId, postalCode } = district;

    const city = await this.cityModel.findById(cityId).exec();

    if (city) {
      city.districts = city.districts.filter(
        (_district) =>
          _district.countryCode !== district.countryCode &&
          _district.cityId !== district.cityId &&
          _district.name !== district.name &&
          _district.postalCode !== district.postalCode,
      );
      city.postalCodes = city.postalCodes.filter((_postalCode) => _postalCode !== postalCode);
  
      await city.save();
    }

    return this.districtModel.findByIdAndDelete(id).exec();
  }
}
