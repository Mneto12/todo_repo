// Config
import { Module } from '@nestjs/common';
import configuration from './Config/configuration';
import { ConfigModule } from '@nestjs/config';
// Controllers, Providers 
import { AuthUseCaseModule } from './Use-cases/auth/auth.usecase.module';
import { UserUseCaseModule } from './Use-cases/users/user.usecase.module';
import { AuthController } from './Controllers/AuthController';
import { TaskController } from './Controllers/TaskController';
import { TaskUseCaseModule } from './Use-cases/tasks/task.usecase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./src/Env/${process.env.NODE_ENV}.env`,
      load: [configuration]
    }),
    AuthUseCaseModule,
    UserUseCaseModule,
    TaskUseCaseModule
  ],
  controllers: [
    TaskController,
    AuthController,
  ],
  providers: [],
})
export class AppModule {}
