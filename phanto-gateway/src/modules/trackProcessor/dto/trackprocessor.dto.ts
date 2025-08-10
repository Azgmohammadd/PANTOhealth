import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator';

export class CoordinateDataDto {
  @ApiProperty({ example: 51.339764, description: 'X coordinate (latitude)' })
  @IsNumber()
  lat: number;

  @ApiProperty({
    example: 12.339223833333334,
    description: 'Y coordinate (longitude)',
  })
  @IsNumber()
  lng: number;

  @ApiProperty({ example: 1.2038, description: 'Speed in m/s' })
  @IsNumber()
  speed: number;
}

export class DataEntryDto {
  @ApiProperty({
    example: 762,
    description: 'Relative time from start in milliseconds',
  })
  @IsNumber()
  relativeTime: number;

  @ApiProperty({
    type: CoordinateDataDto,
    description: 'Coordinate and speed data',
  })
  @ValidateNested()
  @Type(() => CoordinateDataDto)
  coords: CoordinateDataDto;
}

export class DeviceDataDto {
  @ApiProperty({
    type: [DataEntryDto],
    description: 'List of data entries for the device',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataEntryDto)
  data: DataEntryDto[];

  @ApiProperty({
    example: 1735683480000,
    description: 'Timestamp in milliseconds',
  })
  @IsNumber()
  time: number;
}

export class TrackProcessorDataDto {
  @ApiProperty({
    example: {
      '66bb584d4ae73e488c30a072': {
        data: [
          [762, [51.339764, 12.339223833333334, 1.2038]],
          [1766, [51.3397773, 12.3392118, 1.531604]],
        ],
        time: 1735683480000,
      },
    },
    description: 'Map of deviceId to its recorded data',
  })
  @IsObject()
  deviceData: Record<string, DeviceDataDto>;
}
