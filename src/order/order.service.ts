import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './schemas/order.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

  async createOrder(createOrderDto: any): Promise<Order> {
    const { addrtype, prefixstr, casesensitive, publickey, email, lnurl } = createOrderDto;
    const newOrderData = {
      _id: uuidv4(),
      addrtype,
      prefixstr,
      casesensitive: casesensitive ? 1 : 0,
      publickey,
      email,
      lnurl,
      price: 1,
      status: "PENDING",
      createdAt: new Date(),
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
