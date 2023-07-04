import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';

@Injectable()
export class CursoService {

  constructor(
    @InjectRepository(Curso) private cursoRepo: Repository<Curso>,
    @InjectRepository(Instructor) private instRepo: Repository<Instructor>,
  ){}
  async create(createCurso: CreateCursoDto) {
    console.log(createCurso);
    const ins = await this.cursoRepo.findOne({
      where: {
        id: createCurso.InstructorId
      }
    });

    const curso = this.cursoRepo.create(
      {
        ...createCurso,
        instructor : ins
    });

    const n = await this.cursoRepo.save(curso);

    return n;

    //return 'This action adds a new task';
  }
  async findCurseByLevel(level: string) {

    const tasks = await this.cursoRepo.find(
      {
        where: {
          nivel: level
  }
});

      if(tasks.length <= 0){
        throw new BadRequestException("No hay tareas de importancia " + level);
      }
      
      return tasks;
  }

  async update(id: number, updateTask: UpdateCursoDto) {

    await this.cursoRepo.update(
     id,
     updateTask
    )

    const curso = await this.cursoRepo.findOne(
     {
       where: {id}
     }
     );
     if(!curso){
       throw new BadRequestException("Curso no encontrada");
       // return {msn: 'unknown'};
     }
     return curso;

   // return `This action updates a #${id} task`;
 }



 async findOne(id: number) {
  const curso = await this.cursoRepo.findOne(
    {

      where: {
        id
      }
    }
    );

    if(!curso){
      throw new BadRequestException("Task no encontrada");
      // return {msn: 'unknown'};
    }
      return curso;
    
  // return `This action returns a #${id} task`;
}


































  findAll() {
    return `This action returns all curso`;
  }



  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
