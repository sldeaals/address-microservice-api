import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryDocument } from './country.entity';
import { CreateCountryDto, UpdateCountryDto, CountryFilterDto } from './country.dto';
import { PaginationOptions, PaginationResult, paginateSearch } from '../utils/common/pagination.util';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country')
    private readonly countryModel: Model<CountryDocument>,
  ) {}

  async findAll(): Promise<CountryDocument[]> {
    return this.countryModel.find().exec();
  }

  async findById(id: string): Promise<CountryDocument> {
    return this.countryModel.findById(id).exec();
  }

  async create(createCountryDto: CreateCountryDto): Promise<CountryDocument> {
    const createdCountry = new this.countryModel(createCountryDto);
    return createdCountry.save();
  }

  async update(
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<CountryDocument> {
    return this.countryModel
      .findByIdAndUpdate(id, updateCountryDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<CountryDocument> {
    return this.countryModel.findByIdAndDelete(id).exec();
  }

  async searchPaginated(options: PaginationOptions, filters: CountryFilterDto): Promise<PaginationResult<CountryDocument[]>> {
    return paginateSearch<CountryDocument>(
      this.countryModel,
      options,
      (queryBuilder, filters) => {
        if (filters?.name) {
          queryBuilder.or([
            { 'name.common': { $regex: new RegExp(filters.name, 'i') } },
            { 'name.official': { $regex: new RegExp(filters.name, 'i') } },
          ]);
        }
        if (filters?.cca2) {
          queryBuilder.where('cca2').equals(filters.cca2);
        }
        if (filters?.cca3) {
          queryBuilder.where('cca3').equals(filters.cca3);
        }
        return queryBuilder;
      },
      filters
    );
  }
}
