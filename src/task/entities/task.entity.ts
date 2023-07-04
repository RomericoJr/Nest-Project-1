import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;
 
    @Column('text')
    description: string;

    @Column()
    importants:number
    
    @Column('bool', { default: false })
    status: boolean;

    @ManyToOne(()=> User, user => user.tasks)
    user : User;
}
