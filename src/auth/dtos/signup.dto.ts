import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

import { PASSWORD_REGEX } from '../../constants'

export class SignUpDto {
    @IsString()
    @Length(4, 30)
    username: string

    @IsEmail()
    email: string

    @Matches(PASSWORD_REGEX, { message: 'Password too weak' })
    password: string

    @IsNotEmpty()
    confirmPassword: string
}
