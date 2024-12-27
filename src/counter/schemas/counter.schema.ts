import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter {
    @Prop({ type: String, required: true })
    _id: string;

    @Prop({ default: 0, required: true })
    seq: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
