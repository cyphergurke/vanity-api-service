import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApikeyDocument = Apikey & Document;


@Schema()
export class Apikey {
    @Prop({ required: true, unique: true })
    apikey: string;

    @Prop({ type: Types.ObjectId, ref: 'Merchant', required: true })
    merchantId: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: false })
    isAdmin: boolean;
}

export const ApikeySchema = SchemaFactory.createForClass(Apikey);
