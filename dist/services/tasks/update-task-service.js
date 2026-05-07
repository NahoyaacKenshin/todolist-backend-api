import { TaskRepository } from "../../repositories/task.repository";
export async function UpdateTaskService(taskId, userId, data) {
    const taskRepository = new TaskRepository();
    try {
        // Check if task exists and belongs to the user
        const existingTask = await taskRepository.findById(taskId, userId);
        if (!existingTask) {
            return { code: 404, status: "error", message: "Task not found" };
        }
        // Update only provided fields
        const updateData = {};
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.completed !== undefined)
            updateData.completed = data.completed;
        if (Object.keys(updateData).length === 0) {
            return { code: 400, status: "error", message: "No fields to update" };
        }
        // Update the task
        await taskRepository.update(taskId, userId, updateData);
        // Fetch updated task
        const updatedTask = await taskRepository.findById(taskId, userId);
        return {
            code: 200,
            status: "success",
            message: "Task updated successfully",
            data: { task: updatedTask },
        };
    }
    catch (error) {
        console.error("UpdateTaskService error", error);
        return { code: 500, status: "error", message: "Unable to update task" };
    }
}
//# sourceMappingURL=update-task-service.js.map