import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApikeysModule } from './apikeys/apikeys.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerService } from './mailer/mailer.service';
import { OrderProcessingService } from './order-processing/order-processing.service';
import { APP_GUARD } from '@nestjs/core';
import { ApikeyGuard } from './apikeys/apikeys.guard';
import { ApikeysService } from './apikeys/apikeys.service';
import { MerchantModule } from './merchant/merchant.module';
import { MerchantService } from './merchant/merchant.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
    }),
    OrderModule, ApikeysModule, MerchantModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: ApikeyGuard,
  }, AppService,
    MailerService,
    OrderProcessingService, ApikeysService],
})
export class AppModule { }
