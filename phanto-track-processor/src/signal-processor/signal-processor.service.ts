import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignalDTO } from './dto/signal.dto';
import { SignalModel } from './models/signal.model';
import { Signal } from './schema/signal.schema';

@Injectable()
export class SignalProcessorService {
  constructor(@InjectModel(Signal.name) private X_RayModel: Model<Signal>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createSignal(createSignalDTO: SignalDTO): Promise<Signal> {
    const signals = Object.entries(createSignalDTO).reduce(
      (prev, [deviceId, device]) => {
        const signal = new SignalModel(deviceId, device);
        const createdSignal = new this.X_RayModel(signal);

        return [...prev, createdSignal];
      },
      [],
    );

    return this.X_RayModel.insertMany(signals);
  }
}
