import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalGeneratorModule } from './signal-generator/signal-generator.module';
import { SignalProcessorModule } from './signal-processor/signal-processor.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/phanto'),
    SignalGeneratorModule,
    SignalProcessorModule,
  ],
})
export class AppModule {}
