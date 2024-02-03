import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { Public } from 'src/Factory/metadata';
import { AuthUseCase } from 'src/Use-cases/auth/auth.usecase';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { loginDto } from 'src/DTO/loginDto';
import { CreateUserDto } from 'src/DTO/CreateUserDto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private service: AuthUseCase) {}

  @ApiBody({ type: [loginDto] })
  @ApiResponse({ status: 200, description: 'Token' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: any) {
    const { username, password } = user
    return await this.service.signIn(username, password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('refresh')
  async refreshToken(@Body() token: any) {
    return await this.service.refreshToken(token);
  }

  @ApiBody({ type: [CreateUserDto] })
  @ApiResponse({ status: 201, description: 'The User has been successfully created.' })
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.service.register(user);
  }
}
