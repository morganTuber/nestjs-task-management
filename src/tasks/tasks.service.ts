import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '../auth/entities/user.entity'
import { CreateTaskDto } from './dtos/create-task.dto'
import { FilterTaskDto } from './dtos/filter-task.dto'
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto'
import { Task } from './entities/task.entity'
import { TaskRepository } from './repositories/task.repository'

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly tasksRepository: TaskRepository,
    ) {}

    public findAllTasks(user: User, filterTaskDto: FilterTaskDto): Promise<Task[]> {
        return this.tasksRepository.findAllTasks(user, filterTaskDto)
    }

    public createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(user, createTaskDto)
    }

    public async findTaskById(user: User, id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({ id, user })
        if (!task) throw new NotFoundException(`Task with id ${id} not found`)
        return task
    }
    public async deleteTaskById(user: User, id: string): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user })
        if (result.affected === 0)
            throw new NotFoundException(`Task with id ${id} not found`)
    }
    public async updateTaskStatus(
        user: User,
        id: string,
        updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto
        const task = await this.findTaskById(user, id)
        const updatedTask: Task = await this.tasksRepository.save({
            ...task,
            status,
        })
        return updatedTask
    }
}
