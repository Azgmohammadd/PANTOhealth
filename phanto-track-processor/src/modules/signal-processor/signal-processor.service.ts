import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignalDTO } from './dto/signal.dto';
import { ERRORS } from './error/error';
import { SignalModel } from './models/signal.model';
import { Signal, SignalDocument } from './schema/signal.schema';

@Injectable()
export class SignalProcessorService {
  private readonly logger: Logger = new Logger(SignalProcessorService.name);

  constructor(@InjectModel(Signal.name) private db: Model<Signal>) {}

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

  async getDevices() {
    try {
      const devices = await this.db.distinct('deviceId');
      return {
        devices,
      };
    } catch (error) {
      this.throwError(ERRORS.DEVICE_FETCH_FAILED, error);
    }
  }

  async getLatestSignal(deviceId: string) {
    try {
      const lastestSignal = await this.db
        .findOne({
          deviceId,
        })
        .sort({
          timestamp: -1,
        })
        .exec();

      if (!lastestSignal) {
        this.throwError(
          ERRORS.SIGNAL_NOT_FOUND,
          `Signal with deviceId: ${deviceId} not found`,
        );
      }

      return lastestSignal;
    } catch (error) {
      this.throwError(ERRORS.LATEST_SIGNAL_FETCH_FAILED, error);
    }
  }

  async getSignalByMinSpeed(
    deviceId: string,
    minSpeed: number,
    pageSize = 0,
    pageNumber = 0,
  ) {
    try {
      const match: Record<string, unknown> = {
        deviceId,
        averageSpeed: { $gt: minSpeed },
      };

      const pipeline: Record<string, unknown>[] = [
        { $match: match },
        { $sort: { timestampIso: -1 } },
      ];

      if (pageNumber !== 0 && pageSize !== 0) {
        pipeline.push(
          { $skip: (pageNumber - 1) * pageSize },
          { $limit: pageSize },
        );
      }

      const signals = await this.db.aggregate(pipeline as []);
      return signals as [SignalDocument];
    } catch (error) {
      this.throwError(ERRORS.SIGNAL_BY_SPEED_FETCH_FAILED, error);
    }
  }

  async getSignalByTimeRange(
    deviceId: string,
    from?: number,
    to?: number,
    pageSize = 0,
    pageNumber = 0,
  ) {
    try {
      const match: Record<string, unknown> = { deviceId };

      if (from != null || to != null) {
        match.timestamp = {
          ...(from != null && { $gt: from }),
          ...(to != null && { $lt: to }),
        };
      }

      const pipeline: Record<string, unknown>[] = [
        { $match: match },
        { $sort: { timestampIso: -1 } },
      ];

      if (pageNumber && pageSize) {
        pipeline.push(
          { $skip: (pageNumber - 1) * pageSize },
          { $limit: pageSize },
        );
      }

      const signals = await this.db.aggregate(pipeline as []);
      return signals as [SignalDocument];
    } catch (error) {
      this.throwError(ERRORS.SIGNAL_BY_TIME_RANGE_FETCH_FAILED, error);
    }
  }

  async getSignalByTimestamp(deviceId: string, timestamp: string) {
    try {
      const signal = await this.db.aggregate([
        {
          $match: {
            deviceId,
            timestamp,
          },
        },
      ]);

      if (!signal) {
        this.throwError(ERRORS.SIGNAL_NOT_FOUND);
      }

      return signal as unknown as SignalDocument;
    } catch (error) {
      this.throwError(ERRORS.SIGNAL_BY_TIMESTAMP_FETCH_FAILED, error);
    }
  }

  async createSignal(createSignalDTO: SignalDTO) {
    try {
      const signals = Object.entries(createSignalDTO).reduce(
        (prev, [deviceId, device]) => {
          const signal = new SignalModel(deviceId, device);
          const createdSignal = new this.db(signal);

          return [...prev, createdSignal];
        },
        [] as unknown as [SignalDocument],
      );

      return this.db.insertMany(signals);
    } catch (error) {
      this.throwError(ERRORS.SIGNAL_CREATE_FAILED, error);
    }
  }

  async updateSignal(updateSignalDTO: SignalDTO) {
    try {
      const operations = Object.entries(updateSignalDTO).map(
        ([deviceId, device]) => {
          const signal = new SignalModel(deviceId, device);
          return {
            updateOne: {
              filter: { deviceId },
              update: { $set: signal },
              upsert: true,
            },
          };
        },
      );

      return this.db.bulkWrite(operations);
    } catch (error) {
      this.throwError(ERRORS.SIGNAL_UPDATE_FAILED, error);
    }
  }

  deleteSignal(deviceId: string, timestamp: number) {
    try {
      this.db.findOneAndDelete({
        deviceId,
        timestamp,
      });
    } catch (error) {
      this.throwError(ERRORS.SIGNAL_DELETE_FAILED, error);
    }
  }
}
