import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CityDocument } from './city.entity';
import { StateDocument } from '../state/state.entity';
import { DistrictDocument } from '../district/district.entity';
import { CreateCityDto, UpdateCityDto, CityFilterDto } from './city.dto';
import { PaginationOptions, PaginationResult, paginateSearch } from '../utils/pagination.util';

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
    return this.cityModel.findByIdAndDelete(id).exec();
  }

  async searchPaginated(options: PaginationOptions, filters: CityFilterDto): Promise<PaginationResult<CityDocument[]>> {
    return paginateSearch<CityDocument>(
      this.cityModel,
      options,
      (queryBuilder, filters) => {
        if (filters?.name) {
          queryBuilder.where('name').regex(new RegExp(filters.name, 'i'));
        }
        if (filters?.countryCode) {
          queryBuilder.where('countryCode').equals(filters.countryCode);
        }
        return queryBuilder;
      },
      filters
    );
  }

  async createWithDependencies(createCityDto: CreateCityDto): Promise<CityDocument> {
    const state = await this.stateModel
      .findOne({
        stateId: createCityDto.stateId,
        countryCode: createCityDto.countryCode,
      })
      .exec();

    if (!state) {
      throw new Error('State not found');
    }

    const existingCity = state.cities.find(
      (_city) => _city.name === createCityDto.name,
    );
    if (existingCity) {
      throw new Error(`City ${existingCity.name} already exists in the state`);
    }

    const createdCity = new this.cityModel(createCityDto);

    state.cities.push(createdCity);

    await state.save();
    
    return createdCity.save();
  }

  async updateCascade(
    id: string,
    updateCityDto: UpdateCityDto,
  ): Promise<CityDocument> {
    const { stateId, countryCode } = updateCityDto;

    if (!stateId || !countryCode) {
      throw new Error('stateId and countryCode are required');
    }

    const state = await this.stateModel.findOne({ stateId, countryCode }).exec();

    if (!state) {
      throw new Error(
        `State with stateId ${stateId} and countryCode ${countryCode} not found`,
      );
    }

    const currCity = await this.cityModel.findOne({ _id: id }).exec();

    if (!currCity) {
      throw new Error(`City with id ${id} not found`);
    }

    const stateCities = state.cities.filter(
      (_city) =>
        _city.countryCode !== currCity.countryCode &&
        _city.stateId !== currCity.cityId &&
        _city.name !== currCity.name,
    );

    stateCities.push(updateCityDto);
    state.cities = stateCities;

    await state.save();

    return this.cityModel
      .findByIdAndUpdate(id, updateCityDto, { new: true })
      .exec();
  }

  async deleteCascade(id: string): Promise<CityDocument> {
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
