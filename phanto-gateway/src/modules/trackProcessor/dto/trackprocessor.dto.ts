import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

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
  [deviceId: string]: DeviceDataDto;
}
