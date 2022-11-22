import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status: HttpStatus = exception.getStatus();

    // if (status === HttpStatus.BAD_REQUEST) {
    //   const res: any = exception.getResponse();
    //   return { status, error: res.message };
    // }
    const errRes: any = exception.getResponse();
    throw new BadRequestException(errRes, {
      cause: new Error(),
      description: errRes,
    });
    // throw new BadRequestException(errRes.message);
    // TODO:
    // res.status(status).json({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: req.url,
    // });
  }
}
