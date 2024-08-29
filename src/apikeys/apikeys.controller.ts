import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApikeyGuard } from './apikeys.guard';
import { AdminRoute } from 'src/decorators/admin-route.decorator';


@ApiTags('API Keys')
@ApiSecurity('api-key')
@Controller('apikeys')
@UseGuards(ApikeyGuard)
export class ApikeysController {
  constructor(private readonly apikeysService: ApikeysService) { }

  @Post()
  @AdminRoute()
  @ApiOperation({ summary: 'Create a new API key' })
  @ApiResponse({ status: 201, description: 'The API key has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createApikeyDto: CreateApikeyDto) {
    return this.apikeysService.create(createApikeyDto);
  }

  @Post('admin')
  @AdminRoute()
  @ApiOperation({ summary: 'Create a new admin API key' })
  @ApiResponse({ status: 201, description: 'The admin API key has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createAdmin(@Body() createApikeyDto: CreateApikeyDto) {
    return this.apikeysService.create(createApikeyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an API key' })
  @ApiResponse({ status: 200, description: 'The API key has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'API key not found.' })
  remove(@Param('id') id: string) {
    return this.apikeysService.remove(id);
  }
} 