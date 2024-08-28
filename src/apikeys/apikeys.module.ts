import { Module } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { ApikeysController } from './apikeys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apikey, ApikeySchema } from './schemas/apikeys.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Apikey.name, schema: ApikeySchema }]),
  ],
  controllers: [ApikeysController],
  providers: [ApikeysService],
})
export class ApikeysModule { }
