import { TaskRepository } from "../../repositories/task.repository";
export async function DeleteTaskService(taskId, userId) {
    const taskRepository = new TaskRepository();
    try {
        // Check if task exists and belongs to the user
        const existingTask = await taskRepository.findById(taskId, userId);
        if (!existingTask) {
            return { code: 404, status: "error", message: "Task not found" };
        }
        // Delete the task
        await taskRepository.delete(taskId, userId);
        return {
            code: 200,
            status: "success",
            message: "Task deleted successfully",
        };
    }
    catch (error) {
        console.error("DeleteTaskService error", error);
        return { code: 500, status: "error", message: "Unable to delete task" };
    }
}
//# sourceMappingURL=delete-task-service.js.map