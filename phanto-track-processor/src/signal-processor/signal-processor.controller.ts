import { Controller } from '@nestjs/common';
import { SignalProcessorService } from './signal-processor.service';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';
import { SignalDTO } from './dto/signal.dto';

@Controller()
export class SignalProcessorController {
  constructor(private readonly appService: SignalProcessorService) {}

  @MessagePattern('get_signal', Transport.TCP)
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('signal_created', Transport.RMQ)
  handleSignalCreated(data: SignalDTO) {
    this.appService.createSignal(data);
  }
}
