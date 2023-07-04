import { Curso } from "src/curso/entities/curso.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('instructor')
export class Instructor {

    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {select : false})
    password:string;
    
    @Column('bool', { default: true })
    status: boolean;


    // , {eager: true}
    @OneToMany(() => Curso, curso => curso.instructor)
    curso: Curso[];

}
