import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../dto/response.dto';
import { ApiStatus } from '../enums/api-status.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response<ApiResponse<any>> = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const apiResponse: ApiResponse<any> = {
      status: ApiStatus.ERROR,
      error: {
        code: status,
        message: exception.message,
      },
    };

    response.status(status).json(apiResponse);
  }
}
