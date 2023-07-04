import { Column,Entity , ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Instructor } from '../../instructor/entities/instructor.entity';

@Entity('curso')
export class Curso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('text')
    precio: number; 

    // @Column('text')
    // instructor: string;

    @Column('text')
    nivel: string;

    @ManyToOne(()=> Instructor, Instructor => Instructor.curso)
    instructor : Instructor;

}
