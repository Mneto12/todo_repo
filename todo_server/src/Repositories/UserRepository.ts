
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor() {}

  async getByUsername(username: string): Promise<any | undefined> {
    const prisma = new PrismaClient();
    try {
      const user = await prisma.users.findFirstOrThrow({
        where: {
          username: username
        }
      });
      return user;
    } catch (e) {
      console.error(e);
      prisma.$disconnect();
      return e;    
    }
  }

  async findByToken(token: string): Promise<any | undefined> {
    const prisma = new PrismaClient();
    try {
      const user = await prisma.users.findFirstOrThrow({
        where: {
          token: token
        }
      });
      return user;
    } catch (e) {
      console.error(e);
      prisma.$disconnect();
      return e;    
    }
  }

  async save(user: any): Promise<any> {
    const prisma = new PrismaClient();
    try {
      const newUser = await prisma.users.create({
        data: user
      });
      return newUser;
    } catch (e) {
      console.error(e);
      prisma.$disconnect();
      return e;    
    }
  }

  async update(id: string, user: any): Promise<any> {
    const prisma = new PrismaClient();
    try {
      const updatedUser = await prisma.users.update({
        where: {
          id: id
        },
        data: {
          ...user
        }
      });
      return updatedUser;
    } catch (e) {
      console.error(e);
      prisma.$disconnect();
      return e;    
    }
  }
}
