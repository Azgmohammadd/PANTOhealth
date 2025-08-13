import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalGeneratorModule } from './modules/signal-generator/signal-generator.module';
import { SignalProcessorModule } from './modules/signal-processor/signal-processor.module';
import { LoggerModule } from './modules/logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignalGeneratorService } from './modules/signal-generator/signal-generator.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env.example',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    SignalProcessorModule,
    SignalGeneratorModule,
    LoggerModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly signalGenerator: SignalGeneratorService) {}

  async onApplicationBootstrap() {
    await this.signalGenerator.sendSignals();
  }
}
