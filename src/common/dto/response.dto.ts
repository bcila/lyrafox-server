import { ApiStatus } from '../enums/api-status.enum';

export interface ApiResponseError {
  code: number;
  message: string;
  prismaExceptionCode?: string;
}

export interface ApiResponseMeta {
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
}

export class ApiResponse<T> {
  status: ApiStatus;
  data?: T;
  meta?: ApiResponseMeta;
  error?: ApiResponseError;

  constructor(
    status: ApiStatus,
    data?: T,
    meta?: ApiResponseMeta,
    error?: ApiResponseError,
  ) {
    this.status = status;
    this.data = data;
    this.meta = meta;
    this.error = error;
  }
}
