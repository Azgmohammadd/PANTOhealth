/* eslint-disable */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse = {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred.',
    };

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      status = exception.getStatus();
      errorResponse = {
        code: res.code || 'UNKNOWN_ERROR',
        message: res.message || 'An error occurred.',
      };
    }

    response.status(status).json(errorResponse);
  }
}
