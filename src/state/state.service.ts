import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateDocument } from './state.entity';
import { CreateStateDto, UpdateStateDto, StateFilterDto } from './state.dto';
import { PaginationOptions, PaginationResult } from '../utils/pagination.util';

@Injectable()
export class StateService {
  constructor(
    @InjectModel('State')
    private readonly stateModel: Model<StateDocument>,
  ) {}

  async findAll(): Promise<StateDocument[]> {
    return this.stateModel.find().exec();
  }

  async findById(id: string): Promise<StateDocument> {
    return this.stateModel.findById(id).exec();
  }

  async create(createStateDto: CreateStateDto): Promise<StateDocument> {
    const createdState = new this.stateModel(createStateDto);
    return createdState.save();
  }

  async update(
    id: string,
    updateStateDto: UpdateStateDto,
  ): Promise<StateDocument> {
    return this.stateModel
      .findByIdAndUpdate(id, updateStateDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<StateDocument> {
    return this.stateModel.findByIdAndDelete(id).exec();
  }

  async searchPaginated(options: PaginationOptions, filters: StateFilterDto): Promise<PaginationResult<StateDocument[]>> {
    let nameRegex: RegExp;
    const { page = 1, limit = 10 } = options;
    
    const queryBuilder = this.stateModel.find();

    if (filters?.name) {
      nameRegex = new RegExp(filters.name, 'i');
      queryBuilder.where('name').regex(nameRegex);
    }
    if (filters?.countryCode) {
      queryBuilder.where('countryCode').equals(filters.countryCode);
    }

    const totalCount = await this.stateModel.countDocuments(queryBuilder.getFilter());
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
