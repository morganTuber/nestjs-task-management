import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'

import { TaskStatus } from '../enums/task-status.enum'

export class FilterTaskDto {
    @IsOptional()
    @IsNotEmpty()
    query?: string

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus

    @IsOptional()
    sort?: string
}
