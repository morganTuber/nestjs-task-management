import { TaskStatus } from '../model/task.model'

export class FilterTaskDto {
    query?: string
    status?: TaskStatus
}
