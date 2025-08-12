import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //TODO: read data from environment variables
  // TODO: rename to trackProcessor
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
    },
  );

  const tcp_app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );

  await Promise.all([rmq_app.listen(), tcp_app.listen()]);
}
bootstrap();
