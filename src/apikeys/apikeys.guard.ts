import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { InjectModel } from '@nestjs/mongoose';
import { Apikey, ApikeyDocument } from './schemas/apikeys.schemas';
import { Model } from 'mongoose';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_ROUTE_KEY } from 'src/decorators/admin-route.decorator';

@Injectable()
export class ApikeyGuard implements CanActivate {
    constructor(
        @InjectModel(Apikey.name) private apikeyModel: Model<ApikeyDocument>,
        private readonly apikeysService: ApikeysService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        const apiKeyDoc = await this.apikeysService.validateApiKey(apiKey);
        const isAdminRoute = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_ROUTE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!apiKey) {
            throw new UnauthorizedException('API key is missing');
        }
        if (!apiKeyDoc) {
            throw new UnauthorizedException('Invalid API key');
        }
        if (isAdminRoute && !apiKeyDoc.isAdmin) {
            throw new ForbiddenException('Admin privileges required');
        }

        return true;
    }
}

