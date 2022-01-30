import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { userMiddlewares } from './useMiddlewares'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('/api/v1')
    app.useGlobalPipes(new ValidationPipe())
    // registers a list of middlewares
    userMiddlewares(app)
    await app.listen(3000)
}
bootstrap()
