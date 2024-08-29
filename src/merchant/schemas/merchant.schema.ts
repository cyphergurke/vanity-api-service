import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MerchantDocument = Merchant & Document;

@Schema()
export class Merchant {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Apikey' }] })
    apikeys: Types.ObjectId[];

    @Prop({ type: [String] })
    referralCodes: string[];

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
