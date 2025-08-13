import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './modules/logger/logger.module';
import { TrackProcessorModule } from './modules/trackProcessor/trackProcessor.module';

@Module({
  imports: [
    TrackProcessorModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env.example',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
