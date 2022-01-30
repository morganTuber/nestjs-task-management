import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

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

    public findAllTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
        return this.tasksRepository.findAllTasks(filterTaskDto)
    }

    public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto)
    }

    public async findTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({ id })
        if (!task) throw new NotFoundException(`Task with id ${id} not found`)
        return task
    }
    public async deleteTaskById(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id)
        if (result.affected === 0)
            throw new NotFoundException(`Task with id ${id} not found`)
    }
    public async updateTaskStatus(
        id: string,
        updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto
        const task = await this.findTaskById(id)
        const updatedTask: Task = await this.tasksRepository.save({
            ...task,
            status,
        })
        return updatedTask
    }
}
