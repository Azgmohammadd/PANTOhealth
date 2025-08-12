import { Controller } from '@nestjs/common';
import { SignalProcessorService } from './signal-processor.service';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';
import { SignalDTO } from './dto/signal.dto';

@Controller()
export class SignalProcessorController {
  constructor(
    private readonly signalProcessorService: SignalProcessorService,
  ) {}

  @MessagePattern('get_signal', Transport.TCP)
  async getSignals() {
    return await this.signalProcessorService.getSignals();
  }

  @EventPattern('signal_created', Transport.RMQ)
  handleSignalCreated(data: SignalDTO) {
    this.signalProcessorService.createSignal(data);
  }
}
