
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserUseCase } from '../users/user.usecase';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUseCase {
  constructor(
    private userService: UserUseCase,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<Object> {
    const user = await this.userService.FindOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    let User = {
      id: user.id,
      username: user.username,
      token: await this.jwtService.signAsync(payload),
    };

    return User
  }

  async register(user: any): Promise<any> {
    const userCreated = await this.userService.Save(user);

    const payload = { sub: userCreated.id, username: userCreated.username };
    const access_token = await this.jwtService.signAsync(payload);

    let User = {
      username: userCreated.username,
      token: access_token,
      password: userCreated.password,
    }

    return await this.userService.Update(userCreated.id, User)
  }

  async refreshToken(token: string): Promise<any> {
    const user = await this.userService.FindByToken(token);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);

    let User = {
      username: user.username,
      token: access_token,
      password: user.password,
    }

    await this.userService.Update(user.id, User)

    return {access_token: access_token}
  }
}
