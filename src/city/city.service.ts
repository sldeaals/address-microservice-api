import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CityDocument } from './city.entity';
import { StateDocument } from '../state/state.entity';
import { DistrictDocument } from '../district/district.entity';
import { CreateCityDto, UpdateCityDto } from './city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel('City')
    private readonly cityModel: Model<CityDocument>,

    @InjectModel('State')
    private readonly stateModel: Model<StateDocument>,

    @InjectModel('District')
    private readonly districtModel: Model<DistrictDocument>,
  ) {}

  async findAll(): Promise<CityDocument[]> {
    return this.cityModel.find().exec();
  }

  async findById(id: string): Promise<CityDocument> {
    return this.cityModel.findById(id).exec();
  }

  async create(createCityDto: CreateCityDto): Promise<CityDocument> {
    const createdCity = new this.cityModel(createCityDto);
    return createdCity.save();
  }

  async update(
    id: string,
    updateCityDto: UpdateCityDto,
  ): Promise<CityDocument> {
    return this.cityModel
      .findByIdAndUpdate(id, updateCityDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<CityDocument> {
    const city = await this.cityModel.findById(id).exec();

    if (!city) {
      throw new Error('District not found');
    }

    const { stateId } = city;

    const state = await this.stateModel.findById(stateId).exec();

    if (state) {
      state.cities = state.cities.filter(
        (_city) =>
          _city.countryCode !== city.countryCode &&
          _city.stateId !== city.stateId &&
          _city.name !== city.name
      );
  
      await state.save();
      await this.districtModel.deleteMany({ cityId: city.cityId }); 
    }

    return this.cityModel.findByIdAndDelete(id).exec();
  }
}
