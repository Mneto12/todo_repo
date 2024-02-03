import { Module } from '@nestjs/common';
import { UserRepository } from 'src/Repositories/UserRepository';
import { TaskRepository } from './TaskRepository';

@Module({
  providers: [UserRepository, TaskRepository],
  exports: [TaskRepository, UserRepository],
})
export class RepositoryModule {}
