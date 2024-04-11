import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CityDocument } from './city.entity';
import { CreateCityDto, UpdateCityDto } from './city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel('City')
    private readonly cityModel: Model<CityDocument>,
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
}
