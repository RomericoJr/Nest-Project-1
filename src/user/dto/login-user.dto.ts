import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Column } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class LoginUserDto extends PartialType(CreateUserDto) {

    @IsString()
    password:string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

} 