import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateMerchantDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'peter', description: 'The name of the merchant.' })
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: '1', description: 'The email of merchant.' })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'passwordAsHASH!!!', description: 'The password to log in as hash.' })
    readonly password: string;

    @IsString({ each: true })
    @ApiProperty({ example: '1', description: 'The referralCodes of the merchant' })
    readonly referralCodes?: string[];
}
