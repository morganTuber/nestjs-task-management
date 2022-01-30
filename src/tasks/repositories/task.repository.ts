import { EntityRepository, Repository } from 'typeorm'

import { CreateTaskDto } from '../dtos/create-task.dto'
import { FilterTaskDto } from '../dtos/filter-task.dto'
import { Task } from '../entities/task.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto
        const task = this.create({
            title,
            description,
        })
        await this.save(task)
        return task
    }
    public async findAllTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
        const { query, status, sort } = filterTaskDto
        const taskQuery = this.createQueryBuilder('task')
        if (sort) {
            taskQuery.orderBy(
                `LOWER(${sort})`,
                sort.startsWith('-') ? 'DESC' : 'ASC',
            )
        }
        //if status is provided as filter query, filter tasks according to the status
        if (status) {
            taskQuery.andWhere('task.status = :status', { status })
        }
        //if query is provided in request body filter by either title and description of task
        if (query) {
            taskQuery.andWhere(
                'task.title ILIKE :query OR task.description ILIKE :query',
                { query: `%${query}%` },
            )
        }
        return await taskQuery.getMany()
    }
}
