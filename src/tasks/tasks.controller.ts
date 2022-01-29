import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTaskDto } from './dto/filter-task.dto'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'

import { ITask } from './model/task.model'

import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getTasks(@Query() filterTaskDto: FilterTaskDto): ITask[] {
        return this.taskService.getTasks(filterTaskDto)
    }
    @Get(':id')
    getTaskById(@Param('id') id: string): ITask {
        return this.taskService.getTaskById(id)
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): ITask {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        return this.taskService.deleteTask(id)
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): ITask | undefined {
        return this.taskService.updateTaskStatus(id, updateTaskStatusDto.status)
    }
}
