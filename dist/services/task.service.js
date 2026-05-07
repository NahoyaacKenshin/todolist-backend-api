import { taskRepository } from "../repositories/task.repository";
export class TaskService {
    async getTasks(userId) {
        return await taskRepository.findAllByUserId(userId);
    }
    async getTaskById(taskId, userId) {
        const task = await taskRepository.findById(taskId);
        if (!task) {
            throw new Error("Task not found");
        }
        if (task.userId !== userId) {
            throw new Error("Unauthorized: You can only access your own tasks");
        }
        return task;
    }
    async createTask(userId, data) {
        return await taskRepository.create(userId, data);
    }
    async updateTask(taskId, userId, data) {
        const task = await taskRepository.findById(taskId);
        if (!task) {
            throw new Error("Task not found");
        }
        if (task.userId !== userId) {
            throw new Error("Unauthorized: You can only update your own tasks");
        }
        return await taskRepository.update(taskId, data);
    }
    async deleteTask(taskId, userId) {
        const task = await taskRepository.findById(taskId);
        if (!task) {
            throw new Error("Task not found");
        }
        if (task.userId !== userId) {
            throw new Error("Unauthorized: You can only delete your own tasks");
        }
        return await taskRepository.delete(taskId);
    }
}
export const taskService = new TaskService();
//# sourceMappingURL=task.service.js.map