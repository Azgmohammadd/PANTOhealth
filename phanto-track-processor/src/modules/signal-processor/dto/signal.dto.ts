export interface SignalDTO {
  [deviceId: string]: DeviceDataDTO;
}

export interface DeviceDataDTO {
  data: Array<[number, [number, number, number]]>;
  time: string;
}

export interface QueryDTO {
  deviceId: string;
  timestamp: number;
  start: number;
  end: number;
  minSpeed: number;
  pageSize: number;
  pageNumber: number;
}
