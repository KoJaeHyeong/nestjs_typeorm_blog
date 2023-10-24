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
      | { error: string; statusCode: number; message: string };
    this.logger.error(error);
    console.log(exception);

    if (typeof error === 'string') {
      response
        .status(status)
        .json({ success: true, statusCode: status, message: error });
    } else {
      if (typeof error.message !== 'string') {
        error.message = error['message'][0]; // typeorm_message가 list로 오기 때문
      }
      response.status(status).json({ success: false, ...error });
    }
  }
}
