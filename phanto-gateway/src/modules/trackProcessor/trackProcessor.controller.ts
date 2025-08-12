import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import {
  TRACK_PROCESSOR_RMQ_CLIENT,
  TRACK_PROCESSOR_TCP_CLIENT,
} from 'src/services/amqp/trackProcessor.client';
import { TrackProcessorDataDto } from './dto/trackprocessor.dto';

@Controller()
@ApiTags('Signal')
export class TrackProcessorController {
  private readonly logger: Logger = new Logger(TrackProcessorController.name);

  constructor(
    @Inject(TRACK_PROCESSOR_RMQ_CLIENT)
    private readonly trackProcessorRmqClient: ClientProxy,
    @Inject(TRACK_PROCESSOR_TCP_CLIENT)
    private readonly trackProcessorTcpClient: ClientProxy,
  ) {}

  @Post()
  createSignal(@Body() trackProcessordata: TrackProcessorDataDto) {
    this.trackProcessorRmqClient.emit('signal_created', trackProcessordata);
    return { status: 'Signal created successfully' };
  }

  @Get()
  getSignal() {
    const response$ = this.trackProcessorTcpClient.send('get_signal', {});
    return lastValueFrom(response$);
  }
}
