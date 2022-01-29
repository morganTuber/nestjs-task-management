import { nanoid } from 'nanoid'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ITask, TaskStatus } from './model/task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTaskDto } from './dto/filter-task.dto'

@Injectable()
export class TasksService {
    private tasks: ITask[] = [
        {
            id: '1',
            title: 'Clean my room',
            description: 'Lots of cleaning todo',
            status: TaskStatus.OPEN,
        },
        {
            id: '2',
            title: 'Finish God of War',
            description: 'Finish side quests',
            status: TaskStatus.IN_PROGRESS,
        },
    ]
    public getTasks(filterTaskDto: FilterTaskDto): ITask[] {
        let tasks = [...this.tasks]
        const { query, status } = filterTaskDto
        // if status is present in filter query then filter by task status
        tasks = status ? this.tasks.filter(task => task.status === status) : tasks
        // if query is present in filter query search for the query in both title and description of tasks
        tasks = query
            ? this.tasks.filter(
                  task =>
                      task.title.toLowerCase().includes(query.toLowerCase()) ||
                      task.description.toLowerCase().includes(query.toLowerCase()),
              )
            : tasks
        return tasks
    }
    public getTaskById(id: string): ITask {
        const task = this.tasks.find(task => task.id === id)
        if (!task) throw new NotFoundException(`Task with id ${id} not found`)
        return task
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
    public deleteTask(id: string): void {
        const taskToDelete = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id)
    }
    public updateTaskStatus(id: string, status: TaskStatus): ITask | undefined {
        const task = this.getTaskById(id)
        if (task) {
            task.status = status
        }
        return task
    }
}
