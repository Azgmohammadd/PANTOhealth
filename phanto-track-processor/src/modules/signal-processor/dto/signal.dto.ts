export interface SignalDTO {
  [deviceId: string]: DeviceDataDTO;
}

export interface DeviceDataDTO {
  data: Array<[number, [number, number, number]]>;
  time: string;
}
