/* eslint-disable */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, tap } from 'rxjs';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl, body, params, query } = req;
    const requestId = randomUUID();
    const start = Date.now();

    const handlerName = context.getHandler().name;
    const controllerName = context.getClass().name;

    this.logger.log({
        service: 'phanto-gateway',
        controller: controllerName,
        handler: handlerName,
        requestId: requestId,
        method,
        url: originalUrl,
        params,
        query,
        body,
    }, `Incoming request`);

    return next.handle().pipe(
      tap((data) => {
        const ms = Date.now() - start;
        this.logger.log({
          service: 'phanto-gateway',
          controller: controllerName,
          handler: handlerName,
          requestId: requestId,
          method,
          url: originalUrl,
          statusCode: context.switchToHttp().getResponse().statusCode,
          durationMs: ms,
          response: data,
        }, `Outgoing response`);
      }),
    );
  }
}
