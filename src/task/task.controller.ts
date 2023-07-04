import { Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Controller, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';



@Controller('task')
@UsePipes(new ValidationPipe())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTask: CreateTaskDto) {
    return this.taskService.create(createTask);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }
  
  @Get('importants/:importants')
  findImportants(@Param('importants') importants: string) {
    return this.taskService.findImportants(+importants);
  }

  @Get('findTaskByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.taskService.findByUser(+id);
  }

  @Get('searc')
  search(@Query('termino')termino: string){
    console.log('SI LLEGA AQUI');
    return this.taskService.search(termino)
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTask: UpdateTaskDto) {
    return this.taskService.update(+id, updateTask);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
