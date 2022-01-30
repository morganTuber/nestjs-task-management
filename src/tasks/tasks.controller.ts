import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

import { CreateTaskDto } from './dtos/create-task.dto'
import { FilterTaskDto } from './dtos/filter-task.dto'
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto'
import { Task } from './entities/task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public findAll(
        @Req() req: Request,
        @Query() filterTaskDto: FilterTaskDto,
    ): Promise<Task[]> {
        console.log(req)
        return this.tasksService.findAllTasks(filterTaskDto)
    }

    @Post()
    public create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    @Get(':id')
    public findById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findTaskById(id)
    }

    @Delete(':id')
    public deleteTaskById(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTaskById(id)
    }

    @Patch(':id/status')
    public updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, updateTaskStatusDto)
    }
}
