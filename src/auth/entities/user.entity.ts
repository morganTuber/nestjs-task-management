import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
