import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { Apikey, ApikeyDocument } from './schemas/apikeys.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ApikeysService {
  constructor(
    @InjectModel(Apikey.name) private apikeyModel: Model<ApikeyDocument>,
  ) { }

  async create(createApikeyDto: CreateApikeyDto) {
    const apikey = uuidv4();
    const apiKey = new this.apikeyModel({ apikey: apikey, merchant: createApikeyDto.merchant, isAdmin: createApikeyDto.isAdmin });
    await apiKey.save();
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
