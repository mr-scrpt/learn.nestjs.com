import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log('-> in exceprions!', new Date().toISOString);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionStatus = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const exceptionError =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(exceptionStatus).json({
      ...exceptionError,
      timestamp: new Date().toLocaleDateString('ru-RU'),
      mySelfDesctiptoinInfo: 'My Error message!',
    });
  }
}
