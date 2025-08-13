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
      node: process.env.ELASTICSEARCH_URL || 'http://elasticsearch:9200',
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
    if (typeof message === 'object') {
      this.logger.info({...message }, context);
    } else {
      this.logger.info({ message }, context);
    }
  }

  error(message: any, trace?: string, context?: string) {
    if (typeof message === 'object') {
      this.logger.error({...message, trace }, context);
    } else {
      this.logger.error({ message, trace }, context);
    }
  }

  warn(message: any, context?: string) {
    if (typeof message === 'object') {
      this.logger.warn({...message }, context);
    } else {
      this.logger.warn({ message }, context);
    }
  }

  debug(message: any, context?: string) {
    if (typeof message === 'object') {
      this.logger.debug({...message }, context);
    } else {
      this.logger.debug({ message }, context);
    }
  }

  verbose?(message: any, context?: string) {
    if (typeof message === 'object') {
      this.logger.trace({...message }, context);
    } else {
      this.logger.trace({ message }, context);
    }
  }
}
