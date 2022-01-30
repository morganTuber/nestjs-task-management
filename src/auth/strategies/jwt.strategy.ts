import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET'),
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
