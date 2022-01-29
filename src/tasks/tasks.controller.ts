import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { ITask } from './model/task.model'

import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getAllTasks(): ITask[] {
        return this.taskService.getAllTasks()
    }
    @Get(':id')
    getTaskById(@Param('id') id: string): ITask | undefined {
        return this.taskService.getTaskById(id)
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): ITask {
        return this.taskService.createTask(createTaskDto)
    }
}
