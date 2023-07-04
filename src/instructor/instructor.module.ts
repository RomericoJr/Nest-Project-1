import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { Instructor } from './entities/instructor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Curso } from 'src/curso/entities/curso.entity';

@Module({
  controllers: [InstructorController],
  providers: [InstructorService],
  imports:[
    TypeOrmModule.forFeature([Instructor,Curso]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({  secret: 'secret',
                          signOptions: { expiresIn: '1h' }
                        }),
  ],
  exports: [ PassportModule, JwtModule],
})
export class InstructorModule {}
 