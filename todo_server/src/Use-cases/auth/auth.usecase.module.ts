import { Module } from '@nestjs/common';
import { AuthUseCase } from './auth.usecase';
import { UserUseCaseModule } from '../users/user.usecase.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/Constants/auth';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { bCryptService } from 'src/Utils/bCryptService';

@Module({
  imports: [
    UserUseCaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthUseCase, 
    AuthGuard,
    bCryptService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthUseCase, AuthGuard],
})
export class AuthUseCaseModule {}
