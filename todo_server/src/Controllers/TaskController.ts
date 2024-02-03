import { Body, Controller, Get, HttpCode, HttpStatus, Post, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDTO, UpdateTaskDTO, getTaskDTO } from 'src/DTO/TaskDTO';
import { TaskUseCase } from 'src/Use-cases/tasks/task.usecase';

@ApiTags('Task')
@Controller('/task')
export class TaskController {
  constructor(private service: TaskUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Get('getTasks/:completed/:id')
  async getAllTasks(@Param() params: getTaskDTO) {
    const { completed, id } = params;
    return await this.service.getByUserId(completed, id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createTask(@Body() task: CreateTaskDTO) {
    return await this.service.create(task);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('edit/:id')
  async editTask(@Param() param: any, @Body() task: UpdateTaskDTO) {
    const { id } = param;
    return await this.service.editTask(id, task);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  async deleteTask(@Param() param: any) {
    const { id } = param
    return await this.service.delete(id);
  }
}
