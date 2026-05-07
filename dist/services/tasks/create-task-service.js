import { TaskRepository } from "../../repositories/task.repository";
export async function CreateTaskService(userId, title, description) {
    const taskRepository = new TaskRepository();
    try {
        // Create Task
        const task = await taskRepository.create({
            title,
            description: description ?? null,
            userId,
        });
        return {
            code: 201,
            status: "success",
            message: "Task created successfully",
            data: { task },
        };
    }
    catch (error) {
        console.error("CreateTaskService error", error);
        return { code: 500, status: "error", message: "Unable to create task" };
    }
}
//# sourceMappingURL=create-task-service.js.map