import { Module } from '@nestjs/common';
import { SignalProcessorController } from './signal-processor.controller';
import { SignalProcessorService } from './signal-processor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SignalSchema } from './schema/signal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Signal.name,
        schema: SignalSchema,
      },
    ]),
  ],
  controllers: [SignalProcessorController],
  providers: [SignalProcessorService],
})
export class SignalProcessorModule {}
