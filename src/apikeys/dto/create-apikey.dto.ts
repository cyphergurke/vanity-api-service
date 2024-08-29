import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateApikeyDto {
    @ApiProperty({ example: '333', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    readonly merchant: string;

    @ApiProperty({ example: false, description: 'Has Admin rights?' })
    @IsString()
    @IsNotEmpty()
    readonly isAdmin: boolean;

}