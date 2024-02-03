export class CreateTaskDTO {
    title: string;
    description: string;
    userId: string
}  

export class UpdateTaskDTO {
    title: string;
    description: string;
    userId: string
}

export class getTaskDTO {
    id: string;
    completed: string;
}