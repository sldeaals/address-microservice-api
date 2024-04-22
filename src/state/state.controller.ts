import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto, UpdateStateDto } from './state.dto';
import { StateDocument } from './state.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptions, PaginationResult } from '../utils/pagination.util';

@ApiTags('States')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async findAll(
    @Query() query: PaginationOptions,
    @Query('name') name: string,
    @Query('countryCode') countryCode: string,
  ): Promise<PaginationResult<StateDocument[]>> {
    const filters = { name, countryCode };
    return this.stateService.searchPaginated(query, filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<StateDocument> {
    const state = await this.stateService.findById(id);
    if (!state) {
      throw new NotFoundException('State not found');
    }
    return state;
  }

  @Post()
  async create(@Body() createStateDto: CreateStateDto): Promise<StateDocument> {
    return this.stateService.create(createStateDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto): Promise<StateDocument> {
    const existingState = await this.stateService.findById(id);
    if (!existingState) {
      throw new NotFoundException('State not found');
    }
    return this.stateService.update(id, updateStateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<StateDocument> {
    const existingState = await this.stateService.findById(id);
    if (!existingState) {
      throw new NotFoundException('State not found');
    }
    return this.stateService.delete(id);
  }
}
