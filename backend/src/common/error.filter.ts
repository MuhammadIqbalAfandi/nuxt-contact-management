import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  catch(exception: any, host: ArgumentsHost): any {
    const response: Response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      response.status(exception.getStatus()).json({
        errors:
          typeof errorResponse === 'string'
            ? errorResponse
            : ((errorResponse as Record<string, unknown>)?.['message'] ??
              'Unknown error'),
      });
    } else if (exception instanceof ZodError) {
      response.status(400).json({
        errors: exception.errors,
      });
    } else if (exception instanceof Error) {
      this.logger.error(exception);
      response.status(500).json({
        errors: 'Internal Server Error',
      });
    }
  }
}
