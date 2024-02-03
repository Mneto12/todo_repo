
import { Injectable } from '@nestjs/common';
import { PrismaClient, Tasks } from '@prisma/client';
import { CreateTaskDTO } from 'src/DTO/TaskDTO';

@Injectable()
export class TaskRepository {
  constructor() {}

  async getAll(completed: string, id: string): Promise<Tasks[]> {
    let completedCondition = completed === 'true' ? true : false;
    const prisma = new PrismaClient();
    try {
      const tasks = await prisma.tasks.findMany({
        where: {
          userId: id,
          AND: {
            completed: completedCondition
          }
        }
      });
      return tasks;
    } catch (e) {
      console.error(e);
      prisma.$disconnect();
      return e;    
    }
  }

  async save(task: CreateTaskDTO): Promise<Tasks> {
    const prisma = new PrismaClient();
    try {
      const newTask = await prisma.tasks.create({
        data: task
      });
      return newTask;
    } catch (e) {
      console.error(e);
      prisma.$disconnect();
      return e;    
    }
  }

  async edit(id: string, task: CreateTaskDTO): Promise<Tasks> {
    const prisma = new PrismaClient();
    try {
      const editTask = await prisma.tasks.update({
        where: {
          id: id
        },
        data: task
      });
      return editTask;
    } catch (e) {
      console.error(e);
      prisma.$disconnect();
      return e;    
    }
  }

  async delete(id: string): Promise<void> {
    const prisma = new PrismaClient();
    try {
      await prisma.tasks.delete({
        where: {
          id: id
        }
      });
    } catch (e) {
      console.error(e);
      prisma.$disconnect();
      return e;    
    }
  }
}
