import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { User } from '../auth/entities/user.entity'

export const GetUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext): User => {
        const { user } = context.switchToHttp().getRequest()
        return user
    },
)
