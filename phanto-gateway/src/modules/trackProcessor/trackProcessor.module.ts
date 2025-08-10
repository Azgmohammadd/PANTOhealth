import { Module } from '@nestjs/common';
import { TrackProcessorService } from './trackProcessor.service';
import { TrackProcessorController } from './trackProcessor.controller';

@Module({
  imports: [],
  controllers: [TrackProcessorController],
  providers: [TrackProcessorService],
})
export class TrackProcessorModule {}
