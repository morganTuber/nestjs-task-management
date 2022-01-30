import { INestApplication } from '@nestjs/common'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'

export const userMiddlewares = (app: INestApplication): void => {
    app.use(compression())
    app.use(cookieParser())
    app.use(helmet())
    app.use(morgan('dev'))
}
