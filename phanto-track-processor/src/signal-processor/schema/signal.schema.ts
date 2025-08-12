import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SignalDocument = HydratedDocument<Signal>;

@Schema()
export class Signal {
  @Prop()
  deviceId: string;

  @Prop()
  time: Date;

  @Prop()
  dataLength: number;

  @Prop()
  dataVolume: number;

  @Prop()
  averageSpeed: number;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
