import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class ChainInvoice {
    @Prop({ required: true })
    address: string;
}

@Schema()
export class LightningInvoice {
    @Prop({ required: true })
    expires_at: number;

    @Prop({ required: true })
    payreq: string;
}

@Schema()
export class Payment {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    desc_hash: boolean;

    @Prop({ required: true })
    created_at: number;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    callback_url: string;

    @Prop()
    success_url: string;

    @Prop({ required: true })
    hosted_checkout_url: string;

    @Prop({ required: true })
    order_id: string;

    @Prop({ required: true })
    currency: string;

    @Prop({ required: true })
    source_fiat_value: number;

    @Prop({ required: true })
    fiat_value: number;

    @Prop({ required: true })
    auto_settle: boolean;

    @Prop()
    notif_email: string;

    @Prop({ required: true })
    address: string;

    @Prop({ type: Object })
    metadata: Record<string, any>;

    @Prop({ type: ChainInvoice })
    chain_invoice: ChainInvoice;

    @Prop({ required: true })
    uri: string;

    @Prop({ required: true })
    ttl: number;

    @Prop({ type: LightningInvoice })
    lightning_invoice: LightningInvoice;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Order extends Document {
    @Prop({ required: true })
    _id: string;

    @Prop()
    language: string;

    @Prop({ required: true })
    addrtype: string;

    @Prop({ required: true })
    prefixstr: string;

    @Prop({ required: true })
    casesensitive: number;

    @Prop({ required: true })
    publickey: string;

    @Prop()
    partialPriv: string;

    @Prop()
    vanityAddr: string;

    @Prop()
    email: string;

    @Prop()
    lnurl: string;

    @Prop()
    callback_url: string;

    @Prop()
    success_url: string;

    @Prop({ default: 0 })
    price: number;

    @Prop({ type: PaymentSchema })
    payment: Payment;

    @Prop({ required: true })
    status: string;

    @Prop({ type: Array, default: 0 })
    progress: number[];

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
