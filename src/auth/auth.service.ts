import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcryptjs'

import { LoginDto } from './dtos/login.dto'
import { SignUpDto } from './dtos/signup.dto'
import { ISignedToken } from './interfaces/signed-token.interface'
import { UserRepository } from './repositories/user.repository'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly usersRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}
    public signup(signupDto: SignUpDto): Promise<void> {
        return this.usersRepository.createUser(signupDto)
    }
    public async login(loginDto: LoginDto): Promise<ISignedToken> {
        const { username, password } = loginDto
        const foundUser = await this.usersRepository.findOne({ username })
        if (foundUser && (await compare(password, foundUser.password))) {
            const payload = { id: foundUser.id }
            const accessToken = this.jwtService.sign(payload)
            return { accessToken }
        }
        throw new UnauthorizedException('Invalid username or password')
    }
}
