import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';

export const TRACK_PROCESSOR_SERVICE_TOKEN = 'CONSUME_SERVICE';

export const trackProcessorClient: ClientsProviderAsyncOptions = {
  name: TRACK_PROCESSOR_SERVICE_TOKEN,
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('TRACK_PROCESSOR_SERVICE_URL')],
      queue: configService.get<string>('TRACK_PROCESSOR_SERVICE_QUEUE'),
    },
  }),
  inject: [ConfigService],
};
