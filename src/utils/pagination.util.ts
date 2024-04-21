export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[] | T;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export function paginate<T>(
  data: T[],
  options: PaginationOptions,
): PaginationResult<T> {
  const { page, limit } = options;
  const totalCount = data.length;
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalCount,
    totalPages,
    currentPage,
  };
}
