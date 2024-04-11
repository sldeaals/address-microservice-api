import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateDocument } from './state.entity';
import { CreateStateDto, UpdateStateDto } from './state.dto';

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
}
