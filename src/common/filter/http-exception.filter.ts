import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string[] };

    console.log('status', status);

    this.logger.error(error);

    // error message가 여러 개 일수도 있기 때문에 list 처리
    if (typeof error['message'] === 'string') {
      error['message'] = [error['message']];
    }

    if (typeof error === 'string') {
      response
        .status(status)
        .json({ success: true, statusCode: status, message: error });
    } else {
      console.log('!!!!!');
      response.status(status).json({ success: false, ...error });
    }
  }
}
