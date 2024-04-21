import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryDocument } from './country.entity';
import { CreateCountryDto, UpdateCountryDto, CountryFilterDto } from './country.dto';
import { PaginationOptions, PaginationResult } from '../utils/pagination.util';

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
    const { page = 1, limit = 10 } = options;
    const query = {};
    if (filters.name) {
      query['name'] = { $regex: new RegExp(filters.name, 'i') };
    }
    if (filters.cca2) {
      query['cca2'] = { $regex: new RegExp(filters.cca2, 'i') };
    }
    if (filters.cca3) {
      query['cca3'] = { $regex: new RegExp(filters.cca3, 'i') };
    }

    const totalCount = await this.countryModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * limit;

    const data = await this.countryModel.find(query).skip(startIndex).limit(limit).exec();
 
    return {
      data,
      totalCount,
      totalPages,
      currentPage,
    };
  }
}
