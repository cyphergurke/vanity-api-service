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
    const key = uuidv4();
    const apiKey = new this.apikeyModel(createApikeyDto);
    await apiKey.save();
    return key;
  }

  async findAll() {
    return await this.apikeyModel.find();
  }



  async remove(id: number) {
    const result = await this.apikeyModel.deleteOne({ id });
    return result.deletedCount > 0;
  }
}
