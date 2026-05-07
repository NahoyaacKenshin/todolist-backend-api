import { TaskRepository } from "@/repositories/task.repository";

export async function GetTaskService(taskId: string, userId: string) {
  const taskRepository = new TaskRepository();

  try {
    // Get Task by ID and ensure it belongs to the user
    const task = await taskRepository.findById(taskId, userId);

    if (!task) {
      return { code: 404, status: "error", message: "Task not found" };
    }

    return {
      code: 200,
      status: "success",
      message: "Task retrieved successfully",
      data: { task },
    };
  } catch (error) {
    console.error("GetTaskService error", error);
    return { code: 500, status: "error", message: "Unable to retrieve task" };
  }
}
