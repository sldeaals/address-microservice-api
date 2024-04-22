import { Injectable, NotFoundException } from '@nestjs/common';
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
    let nameRegex: RegExp;
    const { page = 1, limit = 10 } = options;

    const queryBuilder = this.countryModel.find();

    if (filters?.name) {
      nameRegex = new RegExp(filters.name, 'i');
      queryBuilder.where('name.common').regex(nameRegex);
    }
    if (filters?.cca2) {
      queryBuilder.where('cca2').equals(filters.cca2);
    }
    if (filters?.cca3) {
      queryBuilder.where('cca3').equals(filters.cca3);
    }

    const totalCount = await this.countryModel.countDocuments(queryBuilder.getFilter());
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = totalCount ? Math.min(page, totalPages) : page;
    const skip = totalCount ? ((currentPage - 1) * limit) : ((page - 1) * limit);

    const data = await queryBuilder.skip(skip).limit(limit).exec();

    if (!data || data.length === 0) {
      throw new NotFoundException('No states found');
    }

    return {
      data,
      totalCount,
      totalPages,
      currentPage,
    };
  }
}
