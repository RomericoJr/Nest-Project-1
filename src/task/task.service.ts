import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Like, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(User) private userRepo: Repository<User>,
    // private taskRepo: Repository<Task> @InjectRepository(Task)
  ){}

  async create(createTask: CreateTaskDto) {
    console.log(createTask);
    const user = await this.userRepo.findOne({
      where: {
        id: createTask.userId
      }
    });
    // console.log(user);
    const task = this.taskRepo.create(
      {
        ...createTask,
      user : user
    });

    const n = await this.taskRepo.save(task);

    return n;

    //return 'This action adds a new task';
  }

  findAll() {
    const tasks = this.taskRepo.find();

    return tasks;
    //return `This action returns all task`;
    
  }

  findByUser( idUser: number){
    const tasks = this.taskRepo.find(

      {
        where: {
          user: {
            id: idUser
          }
  }
}
      );
      if(!tasks){
        throw new BadRequestException("Task" +idUser, "no encontrada");
        // return {msn: 'unknown'};
      }

      return tasks;
  }

  async findImportants(importants: number) {

    const tasks = await this.taskRepo.find(
      {
        where: {
    importants: importants
  }
});

      if(tasks.length <= 0){
        throw new BadRequestException("No hay tareas de importancia " + importants);
      }
      
      return tasks;
  }


  async findOne(id: number) {
    const task = await this.taskRepo.findOne(
      {

        where: {
          id
        }
      }
      );

      if(!task){
        throw new BadRequestException("Task no encontrada");
        // return {msn: 'unknown'};
      }
        return task;
      
    // return `This action returns a #${id} task`;
  }



  async update(id: number, updateTaskDto: UpdateTaskDto) {

     await this.taskRepo.update(
      id,
      updateTaskDto
     )

     const task = await this.taskRepo.findOne(
      {
        where: {id}
      }
      );
      if(!task){
        throw new BadRequestException("Task no encontrada");
        // return {msn: 'unknown'};
      }
      return task;

    // return `This action updates a #${id} task`;
  }

  async remove(id: number) {

    this.taskRepo.delete(id);
    return `This action removes a #${id} task`;
  }

  async search(termino: string){
    const tasks = await this.taskRepo.find(
      {
        where: {
          // hajdn 
    title: Like(`%${termino}%`)
  }
}
      )

      return tasks;
  }
}
