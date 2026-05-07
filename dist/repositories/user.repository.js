import { prisma } from "../lib/prisma";
export class UserRepository {
    async findById(id) {
        return await prisma.user.findFirst({
            where: { id },
            select: { id: true, name: true, email: true, createdAt: true, role: true, emailVerified: true },
        });
    }
    async findByEmail(email) {
        return await prisma.user.findFirst({ where: { email } });
    }
    async create(data) {
        return await prisma.user.create({
            data,
            select: { id: true, name: true, email: true, createdAt: true, role: true, emailVerified: true },
        });
    }
    async markEmailVerified(userId) {
        return prisma.user.update({
            where: { id: userId },
            data: { emailVerified: new Date() },
            select: { id: true, email: true, emailVerified: true },
        });
    }
}
//# sourceMappingURL=user.repository.js.map