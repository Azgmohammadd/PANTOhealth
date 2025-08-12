import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignalDTO } from './dto/signal.dto';
import { SignalModel } from './models/signal.model';
import { Signal, SignalDocument } from './schema/signal.schema';

@Injectable()
export class SignalProcessorService {
  private readonly logger: Logger = new Logger(SignalProcessorService.name);

  constructor(@InjectModel(Signal.name) private X_RayModel: Model<Signal>) {}

  async getSignals() {
    return await this.X_RayModel.find();
  }

  async createSignal(createSignalDTO: SignalDTO) {
    try {
      const signals = Object.entries(createSignalDTO).reduce(
        (prev, [deviceId, device]) => {
          const signal = new SignalModel(deviceId, device);
          const createdSignal = new this.X_RayModel(signal);

          return [...prev, createdSignal];
        },
        [] as unknown as [SignalDocument],
      );

      return this.X_RayModel.insertMany(signals);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
