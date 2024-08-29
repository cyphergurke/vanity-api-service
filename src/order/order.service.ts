import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './schemas/order.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import calculatePrice from 'src/utils/pricecalculation';
import { getBTCInvoice } from 'src/utils/getBTCInvoice';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { addrtype, prefixstr, casesensitive, publickey, callback_url, success_url, email, lnurl } = createOrderDto;

    const prefixLength = prefixstr.length;
    const price = await calculatePrice(addrtype, prefixLength, casesensitive);

    const id = uuidv4();

    let opennodeInvoice: any = null;
    if (price > 0) {
      opennodeInvoice = await getBTCInvoice(id, price);
    }

    const newOrderData = {
      _id: id,
      addrtype,
      prefixstr,
      casesensitive: casesensitive ? 1 : 0,
      publickey,
      email,
      lnurl,
      callback_url,
      success_url,
      price: price,
      status: price < 1 ? 'PAID' : 'PENDING',
      createdAt: new Date(),
      payment: opennodeInvoice,
    };
    const createdOrder = new this.orderModel(newOrderData);
    return createdOrder.save();
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOrderById(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async findOneAndUpdate(
    filter: any,
    update: any,
    options?: any,
  ) {
    return this.orderModel.findOneAndUpdate(filter, update, options).exec();
  }

  async deleteOrder(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
