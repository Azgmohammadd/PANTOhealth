/* eslint-disable */

import { Controller, Logger } from '@nestjs/common';
import { SignalProcessorService } from './signal-processor.service';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';
import { QueryDTO, SignalDTO } from './dto/signal.dto';

@Controller()
export class SignalProcessorController {
  private readonly logger = new Logger(SignalProcessorController.name);

  constructor(
    private readonly signalProcessorService: SignalProcessorService,
  ) {}

  @MessagePattern('get_devices', Transport.TCP)
  async getDevices() {
    return await this.signalProcessorService.getDevices();
  }

  @MessagePattern('get_latest_signal', Transport.TCP)
  async getLatestSignal({ deviceId }: QueryDTO) {
    return await this.signalProcessorService.getLatestSignal(deviceId);
  }

  @MessagePattern('get_signal_by_time_range')
  async getSignalByTimeRange({ deviceId, start, end, pageSize, pageNumber }: QueryDTO) {
    return await this.signalProcessorService.getSignalByTimeRange(
      deviceId,
      start,
      end,
      pageSize,
      pageNumber,
    );
  }

  @MessagePattern('get_signal_by_min_speed', Transport.TCP)
  async getSignalByMinSpeed({ deviceId, minSpeed, pageSize, pageNumber }: QueryDTO) {
    return await this.signalProcessorService.getSignalByMinSpeed(
      deviceId,
      minSpeed,
      pageSize,
      pageNumber,
    );
  }

  @EventPattern('create_signal', Transport.RMQ)
  handleCreateSignal(data: SignalDTO) {
    this.signalProcessorService.createSignal(data);
  }

  @EventPattern('update_signal', Transport.RMQ)
  handleUpdateSignal(data: SignalDTO) {
    this.signalProcessorService.updateSignal(data);
  }

  @EventPattern('delete_device_signal', Transport.RMQ)
  handleDeleteSignal({ deviceId, timestamp } : QueryDTO) {
    this.signalProcessorService.deleteSignal(deviceId, timestamp);
  }

}
