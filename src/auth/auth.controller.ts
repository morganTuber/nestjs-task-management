import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginDto } from './dtos/login.dto'
import { SignUpDto } from './dtos/signup.dto'
import { ISignedToken } from './interfaces/signed-token.interface'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    public signup(@Body() signupDto: SignUpDto): Promise<void> {
        return this.authService.signup(signupDto)
    }

    @Post('login')
    public login(@Body() loginDto: LoginDto): Promise<ISignedToken> {
        return this.authService.login(loginDto)
    }
}
