import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateApikeyDto {
    @ApiProperty({ example: '66d094f4ad9d389dfe01cbde', description: 'Merchant ID' })
    @IsString()
    @IsNotEmpty()
    readonly merchantId: string;

    @ApiProperty({ example: false, description: 'Has Admin rights?' })
    @IsString()
    @IsNotEmpty()
    readonly isAdmin: boolean;

}