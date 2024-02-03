import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/Repositories/repository.module';
import { TaskUseCase } from './task.usecase';

@Module({
  imports: [RepositoryModule],
  providers: [TaskUseCase],
  exports: [TaskUseCase],
})
export class TaskUseCaseModule {}
