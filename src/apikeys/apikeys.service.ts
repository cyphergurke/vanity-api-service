import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { Apikey, ApikeyDocument } from './schemas/apikeys.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MerchantService } from 'src/merchant/merchant.service';

@Injectable()
export class ApikeysService {
  constructor(
    @InjectModel(Apikey.name) private apikeyModel: Model<ApikeyDocument>,
    private readonly merchantService: MerchantService,
  ) { }

  async create(createApikeyDto: CreateApikeyDto) {
    const newapikey = uuidv4();
    const apiKey = new this.apikeyModel({
      apikey: newapikey,
      merchantId: new Types.ObjectId(createApikeyDto.merchantId),
      isAdmin: createApikeyDto.isAdmin,
    });
    const res: any = await apiKey.save();
    await this.merchantService.addApiKey(createApikeyDto.merchantId, res._id);

    return apiKey;
  }

  async remove(id: string) {
    const result = await this.apikeyModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async validateApiKey(apikey: string): Promise<ApikeyDocument> {
    const apiKeyDoc = await this.apikeyModel.findOne({ apikey });
    return apiKeyDoc;
  }
}
