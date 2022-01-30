import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TasksModule } from './tasks/tasks.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'tasks',
            username: 'postgres',
            password: 'ilkbtfmo1',
            autoLoadEntities: true,
            synchronize: true,
        }),
        TasksModule,
    ],
})
export class AppModule {}
