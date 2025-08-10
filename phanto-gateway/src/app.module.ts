import { Module } from '@nestjs/common';
import { TrackProcessorModule } from './modules/trackProcessor/trackProcessor.module';

@Module({
  imports: [TrackProcessorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
