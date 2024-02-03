
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Repositories/UserRepository';

@Injectable()
export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async FindOne(username: string) {
    return await this.userRepository.getByUsername(username)
  }

  async FindByToken(token: string) {
    return await this.userRepository.findByToken(token)
  }

  async Save(user: any) {
    return await this.userRepository.save(user)
  }

  async Update(id: string, user: any) {
    return await this.userRepository.update(id, user)
  }
}
