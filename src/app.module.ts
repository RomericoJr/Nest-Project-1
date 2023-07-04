import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CursoModule } from './curso/curso.module';
import { InstructorModule } from './instructor/instructor.module';


@Module({
  imports: [TaskModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:'postgres',
    password:'rome',
    database: 'projectnest',
    autoLoadEntities: true,
    synchronize: true
  }), UserModule, CursoModule, InstructorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
