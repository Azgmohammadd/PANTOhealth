import { HttpStatus } from '@nestjs/common';

export class Exception {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly status: HttpStatus,
  ) {}
}

export const ERRORS = {
  INVALID_QUERY: new Exception(
    'TRACKPROCESSOR_INVALID_QUERY',
    'Invalid Query',
    HttpStatus.BAD_REQUEST,
  ),

  GET_LATEST_FAILED: new Exception(
    'TRACKPROCESSOR_GET_LATEST_FAILED',
    'Failed to get the latest signal',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),

  GET_BY_MIN_SPEED_FAILED: new Exception(
    'TRACKPROCESSOR_GET_BY_MIN_SPEED_FAILED',
    'Failed to get signals by minimum speed',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),

  GET_BY_RANGE_FAILED: new Exception(
    'TRACKPROCESSOR_GET_BY_RANGE_FAILED',
    'Failed to get signals by time range',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),

  GET_DEVICES_FAILED: new Exception(
    'TRACKPROCESSOR_GET_DEVICES_FAILED',
    'Failed to get devices',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),

  CREATE_SIGNAL_FAILED: new Exception(
    'TRACKPROCESSOR_CREATE_SIGNAL_FAILED',
    'Failed to create signal',
    HttpStatus.BAD_REQUEST,
  ),

  UPDATE_SIGNAL_FAILED: new Exception(
    'TRACKPROCESSOR_UPDATE_SIGNAL_FAILED',
    'Failed to update signal',
    HttpStatus.BAD_REQUEST,
  ),

  DELETE_DEVICE_SIGNALS_FAILED: new Exception(
    'TRACKPROCESSOR_DELETE_DEVICE_SIGNALS_FAILED',
    'Failed to delete device signals',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),

  DELETE_SIGNAL_FAILED: new Exception(
    'TRACKPROCESSOR_DELETE_SIGNAL_FAILED',
    'Failed to delete signal',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
} as const;
