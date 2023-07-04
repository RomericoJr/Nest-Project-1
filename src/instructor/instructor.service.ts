import { Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InstructorService {

  constructor(
    @InjectRepository(Instructor) private instrucRepo: Repository<Instructor>,
    // private taskRepo: Repository<Task> @InjectRepository(Task)

    private jwts : JwtService
  ){}

  async create(createInstructor: CreateInstructorDto) {

    
      const {password, ...useData} = createInstructor
      const user = this.instrucRepo.create({
        ...useData,
        password: bcrypt.hashSync(password,10)
      })

      await this.instrucRepo.save(user);

      delete user.password;

      return {
        ...user};
    
      
        return ;
    

    // const user = this.instrucRepo.create(createInstructor);

    // await this.instrucRepo.save(user);

    //  return user;
  }

  findAll() {
    return `This action returns all instructor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instructor`;
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructor`;
  }
}
