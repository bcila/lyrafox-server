import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { ApiResponse } from '../dto/response.dto';
import { ApiStatus } from '../enums/api-status.enum';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response<ApiResponse<any>> = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unknown error occurred';

    switch (exception.code) {
      case 'P2000':
        statusCode = HttpStatus.BAD_REQUEST;
        message = `The provided value for the column is too long for the column\'s type.`;
        break;
      case 'P2001':
        statusCode = HttpStatus.NOT_FOUND;
        message =
          'The record searched for in the where condition does not exist.';
        break;
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        message = 'Unique constraint failed.';
        break;
      case 'P2003':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed.';
        break;
      case 'P2004':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'A constraint failed on the database.';
        break;
      case 'P2005':
        statusCode = HttpStatus.BAD_REQUEST;
        message = `The stored value is invalid for the field's type.`;
        break;
      case 'P2006':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'The provided value for the field is not valid.';
        break;
      case 'P2007':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Data validation error.';
        break;
      case 'P2008':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Failed to parse the query.';
        break;
      case 'P2009':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Failed to validate the query.';
        break;
      case 'P2010':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Raw query failed.';
        break;
      case 'P2011':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Null constraint violation.';
        break;
      case 'P2012':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Missing a required value.';
        break;
      case 'P2013':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Missing the required argument for field.';
        break;
      case 'P2014':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'The change violates a required relation.';
        break;
      case 'P2015':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'A related record could not be found.';
        break;
      case 'P2016':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Query interpretation error.';
        break;
      case 'P2017':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'The records for relation are not connected.';
        break;
      case 'P2018':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'The required connected records were not found.';
        break;
      case 'P2019':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Input error.';
        break;
      case 'P2020':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Value out of range for the type.';
        break;
      case 'P2021':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'The table does not exist in the current database.';
        break;
      case 'P2022':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'The column does not exist in the current database.';
        break;
      case 'P2023':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Inconsistent column data.';
        break;
      case 'P2024':
        statusCode = HttpStatus.REQUEST_TIMEOUT;
        message =
          'Timed out fetching a new connection from the connection pool.';
        break;
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        message =
          'An operation failed because required records were not found.';
        break;
      case 'P2026':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `The current database provider doesn't support a feature.`;
        break;
      case 'P2027':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Multiple errors occurred during query execution.';
        break;
      case 'P2028':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Transaction API error.';
        break;
      case 'P2029':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Query parameter limit exceeded.';
        break;
      case 'P2030':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Cannot find a fulltext index for the search.';
        break;
      case 'P2031':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message =
          'Transactions require your MongoDB server to be run as a replica set.';
        break;
      case 'P2033':
        statusCode = HttpStatus.BAD_REQUEST;
        message =
          'A number used in the query does not fit into a 64-bit signed integer.';
        break;
      case 'P2034':
        statusCode = HttpStatus.CONFLICT;
        message =
          'Transaction failed due to a write conflict or deadlock. Please retry.';
        break;
      case 'P2035':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Assertion violation on the database.';
        break;
      case 'P2036':
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Error in external connector.';
        break;
      case 'P2037':
        statusCode = HttpStatus.TOO_MANY_REQUESTS;
        message = 'Too many database connections opened.';
        break;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `Prisma error code: ${exception.code}`;
        break;
    }

    response.status(statusCode).json({
      status: ApiStatus.ERROR,
      error: {
        code: statusCode,
        message: message,
        prismaExceptionCode: exception.code,
      },
    });
  }
}
