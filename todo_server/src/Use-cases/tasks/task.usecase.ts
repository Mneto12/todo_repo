import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from 'src/DTO/TaskDTO';
import { TaskRepository } from 'src/Repositories/TaskRepository';

@Injectable()
export class TaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async getByUserId(completed: string, id: string) {
    return await this.taskRepository.getAll(completed, id)
  }

  async create(task: CreateTaskDTO) {
    return await this.taskRepository.save(task)
  }

  async editTask(id: string, task: any) {
    return await this.taskRepository.edit(id, task)
  }
  
  async delete(id: string) {
    return await this.taskRepository.delete(id)
  }
}
