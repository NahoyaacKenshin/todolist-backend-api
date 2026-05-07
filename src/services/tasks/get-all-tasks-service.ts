import { TaskRepository } from "@/repositories/task.repository";

export async function GetAllTasksService(userId: string) {
  const taskRepository = new TaskRepository();

  try {
    // Get all tasks for the user
    const tasks = await taskRepository.findAllByUserId(userId);

    return {
      code: 200,
      status: "success",
      message: "Tasks retrieved successfully",
      data: { tasks, count: tasks.length },
    };
  } catch (error) {
    console.error("GetAllTasksService error", error);
    return { code: 500, status: "error", message: "Unable to retrieve tasks" };
  }
}
