import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 'BTC', description: 'The type of address to be generated.' })
    addrtype: string;

    @ApiProperty({ example: '123', description: 'The prefix string for the vanity address.' })
    prefixstr: string;

    @ApiProperty({ example: true, description: 'Whether the address should be case-sensitive.' })
    casesensitive: boolean;

    @ApiProperty({ example: 'yourPublicKeyHere', description: 'The public key associated with the order.' })
    publickey: string;
}
