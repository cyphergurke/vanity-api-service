import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant, MerchantDocument } from './schemas/merchant.schema';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<MerchantDocument>,
  ) { }

  async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    const newMerchant = await new this.merchantModel(createMerchantDto);
    return newMerchant.save();
  }

  async findAll(): Promise<Merchant[]> {
    return await this.merchantModel.find().populate('apikeys').exec();
  }

  async findOne(id: string): Promise<Merchant> {
    const merchant = await this.merchantModel.findById(id).populate('apikeys').exec();
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }
    return merchant;
  }

  async update(id: string, updateMerchantDto: UpdateMerchantDto): Promise<Merchant> {
    const updatedMerchant = await this.merchantModel.findByIdAndUpdate(
      id,
      updateMerchantDto,
      { new: true },
    ).exec();

    if (!updatedMerchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }

    return updatedMerchant;
  }

  async remove(id: string): Promise<void> {
    const result = await this.merchantModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }
  }


  async addReferralCode(merchantId: string, referralCode: string): Promise<Merchant> {
    const merchant = await this.merchantModel.findByIdAndUpdate(
      merchantId,
      { $addToSet: { referralCodes: referralCode } },
      { new: true, useFindAndModify: false }
    ).exec();

    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${merchantId} not found`);
    }

    return merchant;
  }
}
