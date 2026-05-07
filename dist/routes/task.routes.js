import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { validateSchema } from "../middlewares/validate-schema";
import { createTaskSchema, updateTaskSchema, getTaskSchema } from "../schema/tasks";
// Initialize
const router = Router();
const taskController = new TaskController();
const auth = new AuthMiddleware();
// Task Routes - All require authentication
router.post("/v1", auth.execute, validateSchema(createTaskSchema), taskController.createTask);
router.get("/v1", auth.execute, taskController.getAllTasks);
router.get("/v1/:id", auth.execute, validateSchema(getTaskSchema), taskController.getTask);
router.put("/v1/:id", auth.execute, validateSchema(updateTaskSchema), taskController.updateTask);
router.delete("/v1/:id", auth.execute, validateSchema(getTaskSchema), taskController.deleteTask);
export default router;
//# sourceMappingURL=task.routes.js.map