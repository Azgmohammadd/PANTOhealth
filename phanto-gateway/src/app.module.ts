import { Module } from '@nestjs/common';
import { TrackProcessorModule } from './modules/trackProcessor/trackProcessor.module';
import { LoggerModule } from './modules/logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TrackProcessorModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.example',
      cache: true,
      expandVariables: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
