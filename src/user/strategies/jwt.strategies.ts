import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { validationJWT } from 'src/interfaces/interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'secret',
                // ignoreExpiration: false,
                });
}
        async validate(payload: validationJWT): Promise<User> {
            const {id} = payload
            const user = await this.userRepository.findOneBy({ id });

            if(!user){
                throw new UnauthorizedException('Token no valido');
            }
            if(!user.status){
                throw new UnauthorizedException('No activo')
            }
            return user;
        }
    }
