import { prisma } from "../lib/prisma";
export class TaskRepository {
    async findById(id, userId) {
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
    async findAllByUserId(userId) {
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
    async create(data) {
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
    async update(id, userId, data) {
        return await prisma.task.updateMany({
            where: { id, userId },
            data,
        });
    }
    async delete(id, userId) {
        return await prisma.task.deleteMany({
            where: { id, userId },
        });
    }
}
//# sourceMappingURL=task.repository.js.map