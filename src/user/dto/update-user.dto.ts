import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Column } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, MinLength } from '@nestjs/class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    apellidos: string;


    @IsString()
    password:string;

    @IsString()
    sexo:string;

    @IsNumber()
    edad:Number;
}