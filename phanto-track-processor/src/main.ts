import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
  const logger = new LoggerService();
  const rmq_app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'queue',
        queueOptions: {
          durable: true,
        },
      },
      logger,
    },
  );
  rmq_app.useGlobalInterceptors(new LoggingInterceptor(logger));

  const tcp_app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
      logger,
    },
  );

  tcp_app.useGlobalInterceptors(new LoggingInterceptor(logger));

  await Promise.all([rmq_app.listen(), tcp_app.listen()]);
}
bootstrap();
