import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { TaskStatus } from '../enums/task-status.enum'

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column()
    public title: string

    @Column()
    public description: string

    @Column({ enum: TaskStatus, default: TaskStatus.OPEN })
    public status: TaskStatus
}
