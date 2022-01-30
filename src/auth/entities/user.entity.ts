import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Task } from '../../tasks/entities/task.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ type: 'varchar', nullable: true, select: false })
    confirmPassword: string | null

    @OneToMany(() => Task, task => task.user)
    @JoinColumn()
    public tasks: Task[]
}
