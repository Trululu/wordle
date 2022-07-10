import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import axios from 'axios';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (axios.isAxiosError(exception)) {
      return response.status(exception.response.status).json({
        error_status: exception.response.status,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...exception.response.data,
      });
    }
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let resp: any = { error_message: exception.toString() };

    if (exception instanceof HttpException) {
      resp = exception.getResponse();
    }

    return response.status(status).json(resp);
  }
}
