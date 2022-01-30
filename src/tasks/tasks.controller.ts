import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common'

import { User } from '../auth/entities/user.entity'
import { GetUser } from '../decorators/get-user.decorator'
import { JwtAuthGuard } from '../guards/JwtAuthGuard'
import { CreateTaskDto } from './dtos/create-task.dto'
import { FilterTaskDto } from './dtos/filter-task.dto'
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto'
import { Task } from './entities/task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    public findAll(
        @GetUser() user: User,
        @Query() filterTaskDto: FilterTaskDto,
    ): Promise<Task[]> {
        return this.tasksService.findAllTasks(user, filterTaskDto)
    }

    @Post()
    public create(
        @GetUser() user: User,
        @Body() createTaskDto: CreateTaskDto,
    ): Promise<Task> {
        return this.tasksService.createTask(user, createTaskDto)
    }

    @Get(':id')
    public findById(@GetUser() user: User, @Param('id') id: string): Promise<Task> {
        return this.tasksService.findTaskById(user, id)
    }

    @Delete(':id')
    public deleteTaskById(
        @GetUser() user: User,
        @Param('id') id: string,
    ): Promise<void> {
        return this.tasksService.deleteTaskById(user, id)
    }

    @Patch(':id/status')
    public updateTaskStatus(
        @GetUser() user: User,
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(user, id, updateTaskStatusDto)
    }
}
