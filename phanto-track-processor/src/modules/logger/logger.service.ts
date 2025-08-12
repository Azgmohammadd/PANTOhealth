/* eslint-disable */
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import pino, { multistream } from 'pino';
import pinoElastic from 'pino-elasticsearch';
import pinoPretty from 'pino-pretty';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    const streamToElasticSearch = pinoElastic({
      index: 'phanto-logs',
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
      flushBytes: 1,
    });

    const pretty = pinoPretty({
      colorize: true,
      colorizeObjects: true,
    });

    this.logger = pino(
      { level: 'info' },
      multistream([
        { stream: pretty, },
        { stream: streamToElasticSearch },
      ]),
    );
  }

  log(message: any, context?: string) {
    this.logger.info(message, context);
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
