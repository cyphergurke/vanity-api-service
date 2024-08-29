


import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiSecurity } from '@nestjs/swagger';

@ApiTags('Merchants')
@ApiSecurity('api-key')
@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new merchant' })
  @ApiResponse({ status: 201, description: 'The merchant has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: CreateMerchantDto })
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all merchants' })
  @ApiResponse({ status: 200, description: 'Return all merchants.' })
  findAll() {
    return this.merchantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single merchant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the merchant to retrieve' })
  @ApiResponse({ status: 200, description: 'Return the merchant with the given ID.' })
  @ApiResponse({ status: 404, description: 'Merchant not found.' })
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a merchant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the merchant to update' })
  @ApiBody({ type: UpdateMerchantDto })
  @ApiResponse({ status: 200, description: 'The merchant has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Merchant not found.' })
  update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
    return this.merchantService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a merchant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the merchant to delete' })
  @ApiResponse({ status: 200, description: 'The merchant has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Merchant not found.' })
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }

  @Post(':id/referral-codes')
  @ApiOperation({ summary: 'Add a referral code to a merchant' })
  @ApiParam({ name: 'id', description: 'The ID of the merchant to add a referral code to' })
  @ApiBody({ description: 'The referral code to add', schema: { type: 'object', properties: { referralCode: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'The referral code has been successfully added.' })
  @ApiResponse({ status: 404, description: 'Merchant not found.' })
  addReferralCode(@Param('id') id: string, @Body('referralCode') referralCode: string) {
    return this.merchantService.addReferralCode(id, referralCode);
  }
}
