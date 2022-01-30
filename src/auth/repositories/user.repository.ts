import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { EntityRepository, Repository } from 'typeorm'

import { SignUpDto } from '../dtos/signup.dto'
import { User } from '../entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async createUser(createUserDto: SignUpDto): Promise<User> {
        const { username, email, password, confirmPassword } = createUserDto
        //check whether the password and confirmPassword matches or not
        if (password !== confirmPassword)
            throw new BadRequestException('Password do not match')
        const user = this.create({
            username,
            email,
            password: await hash(password, 12),
        })
        try {
            await this.save(user)
            return user
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // duplicate username or email
            if (error.code === '23505')
                throw new ConflictException('Username or email already exists')
            throw new InternalServerErrorException(error)
        }
    }
}
