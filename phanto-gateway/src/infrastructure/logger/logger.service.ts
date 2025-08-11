import {
  Injectable,
  LogLevel,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { join } from 'path';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { ecsFormat } from '@elastic/ecs-pino-format';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: pino.Logger;
  public readonly httpMiddleware: ReturnType<typeof pinoHttp>;

  constructor() {
    const transport = pino.transport({
      targets: [
        {
          target: 'pino-roll',
          level: 'info',
          options: {
            file: join('logs', 'app.log'), //FIXME: date
            frequency: 'daily',
            mkdir: true,
            size: '10m',
          },
        },
        //TODO: add elk
      ],
    });

    this.logger = pino(
      {
        level: process.env.LOG_LEVEL || 'info',
        ...ecsFormat(),
      },
      transport,
    );

    this.httpMiddleware = pinoHttp({
      logger: this.logger,
    });
  }
  log(message: any, context?: string) {
    this.logger.info({ context }, message);
  }
  error(message: any, trace?: string, context?: string) {
    this.logger.error({ trace, context }, message);
  }
  warn(message: any, context?: string) {
    this.logger.warn({ context }, message);
  }
  debug(message: any, context?: string) {
    this.logger.debug({ context }, message);
  }
  verbose?(message: any, context?: string) {
    this.logger.trace({ context }, message);
  }
}
