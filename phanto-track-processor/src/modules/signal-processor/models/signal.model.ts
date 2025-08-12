/* eslint-disable */
import { DeviceDataDTO } from '../dto/signal.dto';
import haversine = require('haversine');

export class SignalModel {
  deviceId: string;
  timestamp: string;
  timestampIso: string;
  dataLength: number;
  dataVolume: number;
  firstOffset: number;
  lastOffset: number;
  duration: number;
  totalDistance: number;
  averageSpeed: number;
  firstCoord: [number, number];
  lastCoord: [number, number];

  constructor(deviceId: string, deviceData: DeviceDataDTO) {
    this.deviceId = deviceId;
    this.timestamp = deviceData.time;
    this.timestampIso = new Date(this.timestamp).toISOString();
    this.dataLength = deviceData.data.length;
    this.dataVolume = this.#getDataVolume(deviceData);
    this.firstOffset = this.#getFirstOffset(deviceData);
    this.lastOffset = this.#getLastOffset(deviceData);
    this.duration = this.lastOffset - this.firstOffset;
    this.totalDistance = this.#getTotalDistance(deviceData);
    this.averageSpeed = this.#getAverageSpeed(deviceData);
    this.firstCoord = this.#getFirstCoord(deviceData);
    this.lastCoord = this.#getLastCoord(deviceData);
  }

  #getDataVolume(device: DeviceDataDTO): number {
    const json = JSON.stringify(device);
    const encode = new TextEncoder().encode(json);
    return Buffer.byteLength(encode, 'utf8');
  }

  #getFirstOffset(device: DeviceDataDTO) {
    const times = device.data.map(([time, _]) => time);
    return Math.min(...times);
  }

  #getLastOffset(device: DeviceDataDTO) {
    const times = device.data.map(([time, _]) => time);
    return Math.max(...times);
  }

  #getFirstCoord(device: DeviceDataDTO): [number, number] {
    const [time, [x, y, speed]] = device.data.find(
      ([time, _]) => time === this.firstOffset,
    ) as [number, [number, number, number]];
    return [x, y];
  }

  #getLastCoord(device: DeviceDataDTO): [number, number] {
    const [time, [x, y, speed]] = device.data.find(
      ([time, _]) => time === this.lastOffset,
    ) as [number, [number, number, number]];
    return [x, y];
  }

  #getAverageSpeed(device: DeviceDataDTO) {
    const speeds = device.data.map(([time, [x, y, speed]]) => speed);
    return speeds.reduce((prev, speed) => prev + speed) / speeds.length;
  }

  #getTotalDistance(device: DeviceDataDTO) {
    let totalDistance = 0;
    const coords = device.data.map(([time, coord]) => coord);

    for (let index = 1; index < coords.length; index++) {
      const [x1, y1, speed1] = coords[index];
      const [x2, y2, speed2] = coords[index - 1];

      totalDistance += haversine(
        {
          latitude: x1,
          longitude: y1,
        },
        {
          latitude: x2,
          longitude: y2,
        },
      );
    }

    return totalDistance;
  }
}
