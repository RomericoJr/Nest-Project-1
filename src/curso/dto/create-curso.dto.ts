import { IsNumber, IsString } from "class-validator";
import { Column } from "typeorm";
import { Instructor } from '../../instructor/entities/instructor.entity';

export class CreateCursoDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @Column('number')
    @IsNumber()
    precio: number;

    // @Column('text')
    // @IsString()
    // instructor: string;

    @Column('text')
    @IsString()
    nivel: string;

    InstructorId:number; 
}
