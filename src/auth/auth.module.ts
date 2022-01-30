import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserRepository } from './repositories/user.repository'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: 'super-secret-key',
            signOptions: { expiresIn: '7d' },
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
