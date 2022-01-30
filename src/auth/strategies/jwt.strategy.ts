import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { User } from '../entities/user.entity'
import { IJwtPayload } from '../interfaces/jwt-payload.interface'
import { UserRepository } from '../repositories/user.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private readonly usersRepository: UserRepository,
    ) {
        super({
            secretOrKey: 'super-secret-key',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(payload: IJwtPayload): Promise<User> {
        const { id } = payload
        const user = await this.usersRepository.findOne({ id })
        if (!user) throw new UnauthorizedException()
        return user
    }
}
