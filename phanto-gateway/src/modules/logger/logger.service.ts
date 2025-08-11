/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import pino, { multistream } from 'pino';
import pinoHttp from 'pino-http';
import { ecsFormat } from '@elastic/ecs-pino-format';
const pinoElastic = require('pino-elasticsearch');

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: pino.Logger;
  public readonly httpMiddleware: ReturnType<typeof pinoHttp>;

  constructor() {
    const streamToElasticSearch = pinoElastic({
      index: 'phanto-logs',
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    });

    this.logger = pino(
      {
        level: process.env.LOG_LEVEL || 'info',
        ...ecsFormat(),
      },
      multistream([
        { stream: process.stdout },
        { stream: streamToElasticSearch }, //FIXME: the elasticsearch is empty.
      ]),
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
