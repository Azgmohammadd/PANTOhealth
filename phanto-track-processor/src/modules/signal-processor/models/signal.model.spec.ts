/* eslint-disable */

import { SignalModel } from './signal.model';
import { DeviceDataDTO } from '../dto/signal.dto';

describe('SignalModel', () => {
  const sampleData: Record<string, DeviceDataDTO> = {
    '66bb584d4ae73e488c32a072': {
      data: [
        [41731, [51.33958616666666, 12.339038833333333, 1.420484]],
        [42730, [51.33958583333333, 12.339038333333333, 0.798212]],
      ],
      time: 1735683485000 as any,
    },
  };

  const deviceId = '66bb584d4ae73e488c32a072';
  let model: SignalModel;

  beforeEach(() => {
    jest.clearAllMocks();
    model = new SignalModel(deviceId, sampleData[deviceId]);
  });

  it('should set deviceId and timestamp correctly', () => {
    expect(model.deviceId).toBe(deviceId);
    expect(model.timestamp).toBe(sampleData[deviceId].time as any);
    expect(model.timestampIso).toBe(
      new Date(sampleData[deviceId].time as any).toISOString(),
    );
  });

  it('should calculate dataLength correctly', () => {
    expect(model.dataLength).toBe(2);
  });

  it('should calculate dataVolume correctly', () => {
    const json = JSON.stringify(sampleData[deviceId]);
    const encode = new TextEncoder().encode(json);
    const expectedVolume = Buffer.byteLength(encode, 'utf8');
    expect(model.dataVolume).toBe(expectedVolume);
  });

  it('should find first and last offsets', () => {
    expect(model.firstOffset).toBe(41731);
    expect(model.lastOffset).toBe(42730);
  });

  it('should calculate duration correctly', () => {
    expect(model.duration).toBe(42730 - 41731);
  });

  it('should get first and last coordinates correctly', () => {
    expect(model.firstCoord).toEqual([51.33958616666666, 12.339038833333333]);
    expect(model.lastCoord).toEqual([51.33958583333333, 12.339038333333333]);
  });

  it('should calculate average speed correctly', () => {
    const speeds = [1.420484, 0.798212];
    const expected = (1.420484 + 0.798212) / 2;
    expect(model.averageSpeed).toBeCloseTo(expected);
  });
});
