import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const logger = new LoggerService();

  const appContext = await NestFactory.createApplicationContext(AppModule, {
    logger,
  });
  const configService = appContext.get(ConfigService);

  const rmqUrl = configService.getOrThrow<string>('RMQ_URL');
  const rmqQueue = configService.getOrThrow<string>('RMQ_QUEUE');
  const tcpHost = configService.getOrThrow<string>('TCP_HOST');
  const tcpPort = configService.getOrThrow<number>('TCP_PORT');

  await appContext.close();

  // RMQ Microservice
  const rmq_app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue: rmqQueue,
        queueOptions: {
          durable: true,
        },
      },
      logger,
    },
  );
  rmq_app.useGlobalInterceptors(new LoggingInterceptor(logger));
  rmq_app.useGlobalFilters(new GlobalExceptionFilter());

  // TCP Microservice
  const tcp_app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: tcpHost,
        port: tcpPort,
      },
      logger,
    },
  );
  tcp_app.useGlobalInterceptors(new LoggingInterceptor(logger));
  tcp_app.useGlobalFilters(new GlobalExceptionFilter());

  await Promise.all([rmq_app.listen(), tcp_app.listen()]);
}

bootstrap();
