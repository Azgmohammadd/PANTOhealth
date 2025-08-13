import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DeviceDataQueryDto,
  TrackProcessorDataDto,
} from './dto/trackprocessor.dto';
import { TrackProcessorService } from './trackProcessor.service';

@Controller('track-processor@1')
@ApiTags('Signal', 'track-processor')
export class TrackProcessorV1Controller {
  constructor(private readonly trackProcessorService: TrackProcessorService) {}

  @Post('devices')
  createSignal(@Body() trackProcessordata: TrackProcessorDataDto) {
    return this.trackProcessorService.createSignal(trackProcessordata);
  }

  @Put('devices')
  updateSignal(@Body() tratrackProcessordata: TrackProcessorDataDto) {
    return this.trackProcessorService.updateSignal(tratrackProcessordata);
  }

  @Delete('devices/:deviceId')
  deleteSignal(
    @Param('deviceId') deviceId: string,
    @Query('timestamp', ParseIntPipe) timestamp: number,
  ) {
    return this.trackProcessorService.deleteSignal(deviceId, timestamp);
  }

  @Get('devices/:deviceId')
  getSiganl(
    @Param('deviceId') deviceId: string,
    @Query() query: DeviceDataQueryDto,
  ) {
    return this.trackProcessorService.getDataByQuery(deviceId, query);
  }

  @Get('devices')
  getDevices() {
    return this.trackProcessorService.getDevices();
  }
}
