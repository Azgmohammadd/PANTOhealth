import { Module } from '@nestjs/common';
import { TrackProcessorModule } from './modules/trackProcessor/trackProcessor.module';
import { LoggerService } from './infrastructure/logger/logger.service';

@Module({
  imports: [TrackProcessorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
