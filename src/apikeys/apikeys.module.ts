import { Module } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { ApikeysController } from './apikeys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apikey, ApikeySchema } from './schemas/apikeys.schemas';
import { MerchantModule } from 'src/merchant/merchant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Apikey.name, schema: ApikeySchema }]),
    MerchantModule,
  ],
  controllers: [ApikeysController],
  providers: [ApikeysService],
  exports: [ApikeysService, MongooseModule],
})
export class ApikeysModule { }
