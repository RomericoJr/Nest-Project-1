import { IsEmail, IsNumber, IsString, MinLength } from "@nestjs/class-validator";
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    apellidos: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    password:string;

    @IsString()
    sexo:string;

    @IsNumber()
    edad:Number;


}
