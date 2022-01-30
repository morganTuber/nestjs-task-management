import { Controller, Get, Param } from '@nestjs/common'

import { Task } from './entities/task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get(':id')
    public findById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findById(id)
    }
}
