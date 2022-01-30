import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Task } from './entities/task.entity'
import { TaskRepository } from './repositories/task.repository'

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly tasksRepository: TaskRepository,
    ) {}

    public async findById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({ id })
        if (!task) throw new NotFoundException(`Task with id ${id} not found`)
        return task
    }
}
