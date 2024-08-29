import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({ example: '1', description: 'The type of address to be generated.' })
    addrtype: string;

    @ApiProperty({ example: 'BTC', description: 'The prefix string for the vanity address.' })
    prefixstr: string;

    @ApiProperty({ example: true, description: 'Whether the address should be case-sensitive.' })
    casesensitive: boolean;

    @ApiProperty({ example: '025aa2ca0edbfc34ab044265afec5a32205a138c0189a58a137ef973398708e3e8', description: 'The public key associated with the order.' })
    publickey: string;

    @IsOptional()
    @ApiProperty({ example: 'https://callback_url', description: 'The Callback Url is called when the order is processed.' })
    callback_url: string;

    @IsOptional()
    @ApiProperty({ example: 'https://success_url', description: 'The Callback Url is called when the order is processed.' })
    success_url: string;

    @ApiProperty({ example: 'my.mail@address.com', description: 'The Mail address to recieve the processed order' })
    email: string;

    @IsOptional()
    @ApiProperty({ example: '025aa2ca0edbfc34ab044265afec5a32205a138c0189a58a137ef973398708e3e8', description: 'The public key associated with the order.' })
    lnurl: string;
}
