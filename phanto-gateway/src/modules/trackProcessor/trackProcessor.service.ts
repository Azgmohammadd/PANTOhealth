import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  RmqOptions,
} from '@nestjs/microservices';
import { trackProcessorClient } from 'src/services/amqp/trackProcessor.client';

@Injectable()
export class TrackProcessorService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(trackProcessorClient as RmqOptions);
  }

  sendMessage(pattern: string, data: any) {
    return this.client.send(pattern, data);
  }
}
