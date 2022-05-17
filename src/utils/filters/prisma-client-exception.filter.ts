import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response, Request } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: HttpStatus;
    let message: string;

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'Unique constraint failed on one or more fields';
        response.status(status).json({
          statusCode: status,
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      case 'P2003':
        status = HttpStatus.CONFLICT;
        message = 'Foreign key constraint failed on one or more fields';
        response.status(status).json({
          statusCode: status,
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'One or more records were not found';
        response.status(status).json({
          statusCode: status,
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;

      default:
        console.log(exception.message);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Unhandled Prisma Client exception';
        response.status(status).json({
          statusCode: status,
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
        break;
    }
  }
}
