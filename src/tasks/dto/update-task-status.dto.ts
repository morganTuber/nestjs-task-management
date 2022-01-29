import { IsEnum } from 'class-validator'
import { TaskStatus } from '../model/task.model'

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus
}
