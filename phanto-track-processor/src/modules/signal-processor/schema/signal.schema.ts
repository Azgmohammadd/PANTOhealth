import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SignalDocument = HydratedDocument<Signal>;

@Schema()
export class Signal {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  timestamp: string;

  @Prop({ required: true })
  timestampIso: Date;

  @Prop({ required: true })
  dataLength: number;

  @Prop({ required: true })
  dataVolume: number;

  @Prop({ required: true })
  firstOffset: number;

  @Prop({ required: true })
  lastOffset: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  totalDistance: number;

  @Prop({ required: true })
  averageSpeed: number;

  @Prop({ required: true })
  firstCoord: [number, number];

  @Prop({ required: true })
  lastCoord: [number, number];
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
