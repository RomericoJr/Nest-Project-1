import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    apellidos: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {select : false})
    password:string;
    
    @Column('bool', { default: true })
    status: boolean;

    @Column('text')
    sexo:string;

    @Column('int', {nullable: true})
    edad:Number;

    // , {eager: true}
    @OneToMany(() => Task, task => task.user)
    tasks: Task[];
}
