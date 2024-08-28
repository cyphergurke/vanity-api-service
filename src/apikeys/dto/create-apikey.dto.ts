import { IsString, IsNotEmpty } from 'class-validator';

export class CreateApikeyDto {


    @IsString()
    @IsNotEmpty()
    readonly key: string;

    // Add other fields if necessary, for example:
    // @IsDate()
    // readonly createdAt?: Date;
}