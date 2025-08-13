import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import signal from './signal.json';

const SIGNAL_GENERATOR_RMQ_CLIENT = 'SIGNAL_GENERATOR_RMQ_CLIENT';

@Injectable()
export class SignalGeneratorService {
  private readonly logger = new Logger(SignalGeneratorService.name);

  constructor(
    @Inject(SIGNAL_GENERATOR_RMQ_CLIENT)
    private readonly rmqClient: ClientProxy,
  ) {}

  async sendSignals() {
    try {
      await this.rmqClient.connect();

      this.logger.log('Starting to send signals...');

      for (let i = 0; i < 20; i++) {
        this.rmqClient.emit('create_signal', signal);
        this.logger.debug(`Sent signal. iteration ${i + 1}`);
      }

      this.logger.log('Finished sending signals.');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
