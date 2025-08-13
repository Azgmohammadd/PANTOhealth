import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
  trackProcessorRQM,
  trackProcessorTCP,
} from 'src/services/amqp/trackProcessor.client';
import { TrackProcessorService } from './trackProcessor.service';
import { TrackProcessorV1Controller } from './trackProcessorV1.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([trackProcessorRQM, trackProcessorTCP]),
  ],
  controllers: [TrackProcessorV1Controller],
  providers: [TrackProcessorService],
})
export class TrackProcessorModule {}
