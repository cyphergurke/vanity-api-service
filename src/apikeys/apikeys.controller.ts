import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API Keys')
@Controller('apikeys')
export class ApikeysController {
  constructor(private readonly apikeysService: ApikeysService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new API key' })
  @ApiResponse({ status: 201, description: 'The API key has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createApikeyDto: CreateApikeyDto) {
    return this.apikeysService.create(createApikeyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all API keys' })
  @ApiResponse({ status: 200, description: 'Return all API keys.' })
  @ApiResponse({ status: 404, description: 'No API keys found.' })
  findAll() {
    return this.apikeysService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an API key' })
  @ApiResponse({ status: 200, description: 'The API key has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'API key not found.' })
  remove(@Param('id') id: string) {
    return this.apikeysService.remove(+id);
  }
}