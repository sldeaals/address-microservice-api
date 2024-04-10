import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryDocument } from './country.entity';
import { CreateCountryDto, UpdateCountryDto } from './country.dto';

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
}
