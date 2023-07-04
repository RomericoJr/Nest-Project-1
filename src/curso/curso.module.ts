import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  imports: [ TypeOrmModule.forFeature([Curso,Instructor])]
})
export class CursoModule {}
