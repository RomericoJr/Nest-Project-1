import { IsString, IsNumber } from "@nestjs/class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    importants: number;

    userId : number;
}
