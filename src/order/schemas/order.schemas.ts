import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Metadata extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata);

@Schema()
export class ChainInvoice extends Document {
    @Prop({ required: true })
    address: string;
}

export const ChainInvoiceSchema = SchemaFactory.createForClass(ChainInvoice);

@Schema()
export class LightningInvoice extends Document {
    @Prop({ required: true })
    expires_at: number;

    @Prop({ required: true })
    payreq: string;
}

export const LightningInvoiceSchema = SchemaFactory.createForClass(LightningInvoice);

@Schema()
export class Transaction extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: false })
    desc_hash: boolean;

    @Prop({ required: true })
    created_at: number;

    @Prop({ required: true, enum: ['unpaid', 'paid', 'cancelled'], default: 'unpaid' })
    status: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ default: '' })
    callback_url: string;

    @Prop({ default: '' })
    success_url: string;

    @Prop({ default: '' })
    hosted_checkout_url: string;

    @Prop({ required: true })
    order_id: string;

    @Prop({ required: true })
    currency: string;

    @Prop({ required: true })
    source_fiat_value: number;

    @Prop({ required: true })
    fiat_value: number;

    @Prop({ default: false })
    auto_settle: boolean;

    @Prop({ required: true })
    notif_email: string;

    @Prop({ required: true })
    address: string;

    @Prop({ type: MetadataSchema })
    metadata: Metadata;

    @Prop({ type: ChainInvoiceSchema })
    chain_invoice: ChainInvoice;

    @Prop({ required: true })
    uri: string;

    @Prop({ required: true })
    ttl: number;

    @Prop({ type: LightningInvoiceSchema })
    lightning_invoice: LightningInvoice;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

@Schema()
export class Payment extends Document {
    @Prop({ enum: ["PAYPAL", "OPENNODE"] })
    provider: string;

    @Prop({ type: TransactionSchema })
    opennode: Transaction;

    @Prop({ default: null })
    amount: number;

    @Prop()
    txid: string;

    @Prop({ type: Date })
    txAt: Date;

    @Prop({ enum: ["BTC", "EUR", "USD"] })
    paidCurrency: string;
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
