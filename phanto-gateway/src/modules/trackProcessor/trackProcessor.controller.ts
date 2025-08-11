import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  TRACK_PROCESSOR_RMQ_CLIENT,
  TRACK_PROCESSOR_TCP_CLIENT,
} from 'src/services/amqp/trackProcessor.client';
import { TrackProcessorDataDto } from './dto/trackprocessor.dto';

@Controller()
export class TrackProcessorController {
  constructor(
    // TODO: move to a service if logic grows
    @Inject(TRACK_PROCESSOR_RMQ_CLIENT)
    private readonly trackProcessorRmqClient: ClientProxy,
    @Inject(TRACK_PROCESSOR_TCP_CLIENT)
    private readonly trackProcessorTcpClient: ClientProxy,
  ) {}

  @Post() //TODO: should be rmq endpoint
  createSignal(@Body() trackProcessordata: TrackProcessorDataDto) {
    this.trackProcessorRmqClient.emit('signal_created', trackProcessordata);
    return { status: 'Signal created successfully' };
  }

  @Get(':deviceId') //TODO: shoulld be tcp endpoint
  getSignal(@Body('deviceId') deviceId: string) {
    const response$ = this.trackProcessorTcpClient.send('get_signal', {
      deviceId,
    });
    return lastValueFrom(response$);
  }
}
