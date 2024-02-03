import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/Repositories/repository.module';
import { UserUseCase } from './user.usecase';

@Module({
  imports: [RepositoryModule],
  providers: [UserUseCase],
  exports: [UserUseCase],
})
export class UserUseCaseModule {}
