import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateCursoDto{

    @IsString()
    title: string;

    @IsString()
    description: string;


}
