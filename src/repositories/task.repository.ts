import { prisma } from "@/lib/prisma";

export class TaskRepository {
  async findById(id: string, userId: string) {
    return await prisma.task.findFirst({
      where: { id, userId },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return await prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: { title: string; description?: string | null; userId: string }) {
    return await prisma.task.create({
      data,
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(
    id: string,
    userId: string,
    data: { title?: string; description?: string | null; completed?: boolean }
  ) {
    return await prisma.task.updateMany({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return await prisma.task.deleteMany({
      where: { id, userId },
    });
  }
}
