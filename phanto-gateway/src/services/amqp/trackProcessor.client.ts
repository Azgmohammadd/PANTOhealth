import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';

export const TRACK_PROCESSOR_RMQ_CLIENT = 'TRACK_PROCESSOR_RMQ_CLIENT';
export const TRACK_PROCESSOR_TCP_CLIENT = 'TRACK_PROCESSOR_TCP_CLIENT';

export const trackProcessorRQM: ClientsProviderAsyncOptions = {
  name: TRACK_PROCESSOR_RMQ_CLIENT,
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow<string>('TRACK_PROCESSOR_AMQP_URL')],
      queue: configService.getOrThrow<string>('TRACK_PROCESSOR_AMQP_QUEUE'),
    },
  }),
  inject: [ConfigService],
};

export const trackProcessorTCP: ClientsProviderAsyncOptions = {
  name: TRACK_PROCESSOR_TCP_CLIENT,
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: Transport.TCP,
    options: {
      host: configService.getOrThrow<string>('TRACK_PROCESSOR_TCP_HOST'),
      port: configService.getOrThrow<number>('TRACK_PROCESSOR_TCP_PORT'),
    },
  }),
  inject: [ConfigService],
};
