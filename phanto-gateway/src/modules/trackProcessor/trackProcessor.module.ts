import { Module } from '@nestjs/common';
import { TrackProcessorController } from './trackProcessor.controller';
import { ClientsModule } from '@nestjs/microservices';
import {
  trackProcessorRQM,
  trackProcessorTCP,
} from 'src/services/amqp/trackProcessor.client';

@Module({
  imports: [
    ClientsModule.registerAsync([trackProcessorRQM, trackProcessorTCP]),
  ],
  controllers: [TrackProcessorController],
  providers: [],
})
export class TrackProcessorModule {}
