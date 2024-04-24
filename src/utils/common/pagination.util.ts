import { Model, Document, Query, FilterQuery } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { FilterDto } from '../util.dto';

export type SortOrder = 'asc' | 'desc';

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
  order?: SortOrder;
}

export interface PaginationResult<T> {
  data: T[] | T;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export type FilterFn<T> = (queryBuilder: Query<T[], Document<T>>, filters: FilterDto) => Query<T[], Document<T>>;

export async function paginateSearch<T extends Document>(
  model: Model<T>,
  options: PaginationOptions,
  filterFn: FilterFn<T> | undefined,
  filters: FilterDto
): Promise<PaginationResult<T[]>> {
  const { page = 1, limit = 10, sort, order } = options;

  let queryBuilder = model.find() as Query<T[], Document<T>>;

  if (filterFn) {
    queryBuilder = filterFn(queryBuilder, filters);
  }

  const totalCount = await model.countDocuments(queryBuilder.getFilter() as FilterQuery<T>);
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = totalCount ? Math.min(page, totalPages) : page;
  const skip = totalCount ? (currentPage - 1) * limit : (page - 1) * limit;

  if (sort && order) {
    const sortOptions: { [key: string]: SortOrder } = { [sort]: order };
    queryBuilder = queryBuilder.sort(sortOptions);
  }

  const data = await queryBuilder.skip(skip).limit(limit).exec();

  if (!data || data.length === 0) {
    throw new NotFoundException('No records found');
  }

  return {
    data,
    totalCount,
    totalPages,
    currentPage,
  };
}

