import { HttpStatus } from '@nestjs/common';

export class AppError {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly status: HttpStatus,
  ) {}
}

export const ERRORS = {
  DEVICE_FETCH_FAILED: new AppError(
    'DEVICE_FETCH_FAILED',
    'Failed to get devices.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  LATEST_SIGNAL_FETCH_FAILED: new AppError(
    'LATEST_SIGNAL_FETCH_FAILED',
    'Failed to get latest signal.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  SIGNAL_NOT_FOUND: new AppError(
    'SIGNAL_NOT_FOUND',
    'Signal not found for the given device.',
    HttpStatus.NOT_FOUND,
  ),
  SIGNAL_BY_SPEED_FETCH_FAILED: new AppError(
    'SIGNAL_BY_SPEED_FETCH_FAILED',
    'Failed to fetch signals by minimum speed.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  SIGNAL_BY_TIME_RANGE_FETCH_FAILED: new AppError(
    'SIGNAL_BY_TIME_RANGE_FETCH_FAILED',
    'Failed to fetch signals by time range.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  SIGNAL_BY_TIMESTAMP_FETCH_FAILED: new AppError(
    'SIGNAL_BY_TIMESTAMP_FETCH_FAILED',
    'Failed to fetch signal by timestamp.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  SIGNAL_CREATE_FAILED: new AppError(
    'SIGNAL_CREATE_FAILED',
    'Failed to create signal.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  SIGNAL_UPDATE_FAILED: new AppError(
    'SIGNAL_UPDATE_FAILED',
    'Failed to update signals.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  SIGNAL_DELETE_FAILED: new AppError(
    'SIGNAL_DELETE_FAILED',
    'Failed to delete signal.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
};
