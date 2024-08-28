import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApikeyDocument = Apikey & Document;

@Schema()
export class Apikey {

    @Prop({ required: true, unique: true })
    key: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    // Additional fields if needed
}

export const ApikeySchema = SchemaFactory.createForClass(Apikey);
