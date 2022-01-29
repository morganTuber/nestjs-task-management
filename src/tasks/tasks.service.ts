import { nanoid } from 'nanoid'
import { Injectable } from '@nestjs/common'
import { ITask, TaskStatus } from './model/task.model'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
    private tasks: ITask[] = [
        {
            id: '12345',
            title: 'Clean my room',
            description: 'Lots of cleaning todo',
            status: TaskStatus.OPEN,
        },
    ]
    public getAllTasks(): ITask[] {
        return this.tasks
    }
    public getTaskById(id: string): ITask | undefined {
        return this.tasks.find(task => task.id === id)
    }
    public createTask(createTaskDto: CreateTaskDto): ITask {
        const { title, description } = createTaskDto
        const task = {
            id: nanoid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task)
        return task
    }
}
