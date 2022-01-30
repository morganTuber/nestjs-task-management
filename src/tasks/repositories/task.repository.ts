import { EntityRepository, Repository } from 'typeorm'

import { User } from '../../auth/entities/user.entity'
import { CreateTaskDto } from '../dtos/create-task.dto'
import { FilterTaskDto } from '../dtos/filter-task.dto'
import { Task } from '../entities/task.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    public async createTask(
        user: User,
        createTaskDto: CreateTaskDto,
    ): Promise<Task> {
        const { title, description } = createTaskDto
        const task = this.create({
            title,
            description,
            user,
        })
        await this.save(task)
        return task
    }
    public async findAllTasks(
        user: User,
        filterTaskDto: FilterTaskDto,
    ): Promise<Task[]> {
        const { query, status, sort } = filterTaskDto
        const taskQuery = this.createQueryBuilder('task')
        //query only the tasks belonging to the logged in user
        taskQuery.where({ user })
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
                '(task.title ILIKE :query OR task.description ILIKE :query)',
                { query: `%${query}%` },
            )
        }
        return await taskQuery.getMany()
    }
}
