import { CreateTaskService, GetTaskService, GetAllTasksService, UpdateTaskService, DeleteTaskService, } from "../services/tasks";
export class TaskController {
    // Create Task
    createTask = async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.sub;
        if (!userId) {
            return res.status(401).json({
                code: 401,
                status: "error",
                message: "Authentication required",
            });
        }
        const { title, description } = req.body ?? {};
        const result = await CreateTaskService(userId, title, description);
        return res.status(result.code).json(result);
    };
    // Get Single Task
    getTask = async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.sub;
        if (!userId) {
            return res.status(401).json({
                code: 401,
                status: "error",
                message: "Authentication required",
            });
        }
        const { id } = req.params ?? {};
        const result = await GetTaskService(id, userId);
        return res.status(result.code).json(result);
    };
    // Get All Tasks for User
    getAllTasks = async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.sub;
        if (!userId) {
            return res.status(401).json({
                code: 401,
                status: "error",
                message: "Authentication required",
            });
        }
        const result = await GetAllTasksService(userId);
        return res.status(result.code).json(result);
    };
    // Update Task
    updateTask = async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.sub;
        if (!userId) {
            return res.status(401).json({
                code: 401,
                status: "error",
                message: "Authentication required",
            });
        }
        const { id } = req.params ?? {};
        const { title, description, completed } = req.body ?? {};
        const result = await UpdateTaskService(id, userId, { title, description, completed });
        return res.status(result.code).json(result);
    };
    // Delete Task
    deleteTask = async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.sub;
        if (!userId) {
            return res.status(401).json({
                code: 401,
                status: "error",
                message: "Authentication required",
            });
        }
        const { id } = req.params ?? {};
        const result = await DeleteTaskService(id, userId);
        return res.status(result.code).json(result);
    };
}
//# sourceMappingURL=task.controller.js.map