import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SignalGeneratorService } from './signal-generator.service';

const SIGNAL_GENERATOR_RMQ_CLIENT = 'SIGNAL_GENERATOR_RMQ_CLIENT';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SIGNAL_GENERATOR_RMQ_CLIENT,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RMQ_URL')],
            queue: configService.getOrThrow<string>('RMQ_QUEUE'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [SignalGeneratorService],
  exports: [SignalGeneratorService],
})
export class SignalGeneratorModule {}
