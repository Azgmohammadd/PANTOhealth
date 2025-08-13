import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  TRACK_PROCESSOR_RMQ_CLIENT,
  TRACK_PROCESSOR_TCP_CLIENT,
} from 'src/services/amqp/trackProcessor.client';
import {
  DeviceDataQueryDto,
  TrackProcessorDataDto,
} from './dto/trackprocessor.dto';
import { ERRORS } from './error/errors';

@Injectable()
export class TrackProcessorService {
  constructor(
    @Inject(TRACK_PROCESSOR_RMQ_CLIENT)
    private readonly trackProcessorRmqClient: ClientProxy,
    @Inject(TRACK_PROCESSOR_TCP_CLIENT)
    private readonly trackProcessorTcpClient: ClientProxy,
  ) {}

  private readonly logger = new Logger(TrackProcessorService.name);
  private throwError(
    errorDef: (typeof ERRORS)[keyof typeof ERRORS],
    details?: any,
  ) {
    if (details) this.logger.error(details);
    throw new HttpException(
      { code: errorDef.code, message: errorDef.message },
      errorDef.status,
    );
  }

  getDataByQuery(deviceId: string, query: DeviceDataQueryDto) {
    if (query.latest) return this.#getLatest(deviceId);

    if (query.minSpeed)
      return this.#getByMinSpeed(
        deviceId,
        query.minSpeed,
        query.pageSize ?? 0,
        query.pageNumber ?? 0,
      );

    if (query.start || query.end)
      return this.#getByRange(
        deviceId,
        query.start,
        query.end,
        query.pageSize ?? 0,
        query.pageNumber ?? 0,
      );

    this.throwError(ERRORS.INVALID_QUERY);
  }

  getDevices() {
    try {
      const response$ = this.trackProcessorTcpClient.send('get_devices', {});

      return lastValueFrom(response$);
    } catch (error) {
      this.throwError(ERRORS.GET_DEVICES_FAILED, error);
    }
  }

  createSignal(signalData: TrackProcessorDataDto) {
    try {
      this.trackProcessorRmqClient.emit('create_signal', signalData);

      return { status: 'Signal created successfully' };
    } catch (error) {
      this.throwError(ERRORS.CREATE_SIGNAL_FAILED, error);
    }
  }

  updateSignal(signalData: TrackProcessorDataDto) {
    try {
      this.trackProcessorRmqClient.emit('update_signal', signalData);

      return { status: 'Signal updated successfully' };
    } catch (error) {
      this.throwError(ERRORS.UPDATE_SIGNAL_FAILED, error);
    }
  }

  deleteDeviceSignals(deviceId: string) {
    try {
      this.trackProcessorRmqClient.emit('delete_device_signals', {
        deviceId,
      });

      return { status: 'Signal deleted successfully' };
    } catch (error) {
      this.throwError(ERRORS.DELETE_DEVICE_SIGNALS_FAILED, error);
    }
  }

  deleteSignal(deviceId: string, timestamp: number) {
    try {
      this.trackProcessorRmqClient.emit('delete_device_signal', {
        deviceId,
        timestamp,
      });

      return { status: 'Signal deleted successfully' };
    } catch (error) {
      this.throwError(ERRORS.DELETE_SIGNAL_FAILED, error);
    }
  }

  #getLatest(deviceId: string) {
    try {
      const response$ = this.trackProcessorTcpClient.send('get_latest_signal', {
        deviceId,
      });

      return lastValueFrom(response$);
    } catch (error) {
      this.throwError(ERRORS.GET_LATEST_FAILED, error);
    }
  }

  #getByMinSpeed(
    deviceId: string,
    minSpeed: number,
    pageSize: number,
    pageNumber: number,
  ) {
    try {
      const response$ = this.trackProcessorTcpClient.send(
        'get_signal_by_min_speed',
        {
          deviceId,
          minSpeed: +minSpeed,
          pageSize,
          pageNumber,
        },
      );

      return lastValueFrom(response$);
    } catch (error) {
      this.throwError(ERRORS.GET_BY_MIN_SPEED_FAILED, error);
    }
  }

  #getByRange(
    deviceId: string,
    start?: number,
    end?: number,
    pageSize?: number,
    pageNumber?: number,
  ) {
    try {
      const response$ = this.trackProcessorTcpClient.send(
        'get_signal_by_time_range',
        {
          deviceId,
          start: start ? +start : null,
          end: end ? +end : null,
          pageSize: pageSize ? +pageSize : null,
          pageNumber: pageNumber ? +pageNumber : null,
        },
      );

      return lastValueFrom(response$);
    } catch (error) {
      this.throwError(ERRORS.GET_BY_RANGE_FAILED, error);
    }
  }
}
