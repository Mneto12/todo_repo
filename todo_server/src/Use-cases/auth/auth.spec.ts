import { PrismaClient } from '@prisma/client';

describe('Register user', () => {
  it('auth user', async () => {
    const prisma = new PrismaClient();
    const User = {
        username: 'Miguelito',
        password: '12345678',
    }
    const newUser = await prisma.users.create({
        data: User,
    })
    console.log(newUser)
    expect(newUser).toBeDefined()
  });
});