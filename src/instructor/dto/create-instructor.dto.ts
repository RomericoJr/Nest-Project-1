import { IsEmail } from "@nestjs/class-validator";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateInstructorDto {
    @IsString()
    name: string;

    @IsEmail()

    @IsString()
    email: string;

    @IsString()
    password:string;

}
