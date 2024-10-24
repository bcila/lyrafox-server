import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unknown error occurred';

    switch (exception.code) {
      case 'P1000':
        statusCode = HttpStatus.UNAUTHORIZED;
        message = 'Authentication failed against the database server';
        break;
      case 'P1001':
        statusCode = HttpStatus.GATEWAY_TIMEOUT;
        message = "Can't reach database server";
        break;
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        message = 'Unique constraint failed';
        break;
      case 'P2003':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed';
        break;
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;
      default:
        message = `Prisma error code: ${exception.code}`;
        break;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.meta?.cause || message,
    });
  }
}
