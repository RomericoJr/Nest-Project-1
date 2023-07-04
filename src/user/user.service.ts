import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { token, validationJWT } from 'src/interfaces/interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    // private taskRepo: Repository<Task> @InjectRepository(Task)

    private jwts : JwtService
  ){}
  async create(createUser: CreateUserDto) {

    try {
      const {password, ...useData} = createUser
      const user = this.userRepo.create({
        ...useData,
        password: bcrypt.hashSync(password,10)
      })

      await this.userRepo.save(user);

      delete user.password;

      return {
        ...user};
    } 
      catch (error) {
        return error;
    }

    // const user = this.userRepo.create(createUser);

    // await this.userRepo.save(user);

    // return user;
  }
  validaToken(token: token){
    try {
      this.jwts.verify(token.token, {secret: 'secret'});
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }

  }
async login(loginUser : LoginUserDto){

  try {
    const {password, email} = loginUser;
    const userFind = await this.userRepo.findOne(
      {where: {email},
      select :{id : true, password: true, email: true, name: true, apellidos : true, status : true}
      //si son el mismo nombre se puede dejar {email} en ves de {emai}
    })
    // console.log(userFind)
    if (!userFind) {
      throw new UnauthorizedException('Credenciales invalidas');
    }
    if (!bcrypt.compareSync(password, userFind.password)){
      throw new UnauthorizedException('Credenciales invalidas');
    }
    delete userFind.password;

    return {
      ...userFind,
      token: this.getJWToken({id: userFind.id, name: userFind.name, apellido: userFind.apellidos})
    }
    // return userFind;
  } 
  catch (error) {
    return error;
  }
}

private getJWToken(payload: validationJWT){
  const token = this.jwts.sign(payload);
  return token;
}

  findAll() {
    const users = this.userRepo.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(
      {
        relations: ['tasks'],
        where: {id}
      }
      );

      if(!user){
        throw new BadRequestException("User no encontrada");
        // return {msn: 'unknown'};
      }
        return user;
      // return `This action returns a #${id} task`;
  }

  async update(id: number, updateUser: UpdateUserDto ) {

    await this.userRepo.update(
     id,
     updateUser
    )

    const user = await this.userRepo.findOne(
     {
       where: {id}
     }
     );
     if(!user){
       throw new BadRequestException("Task no encontrada");
       // return {msn: 'unknown'};
     }
     return user;

   // return `This action updates a #${id} task`;
 }
 async remove(id: number) {

  this.userRepo.delete(id);
  return `This action removes a #${id} task`;
}




}


