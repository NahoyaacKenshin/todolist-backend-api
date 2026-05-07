import { Request, Response } from "express";
import {
  CreateTaskService,
  GetTaskService,
  GetAllTasksService,
  UpdateTaskService,
  DeleteTaskService,
} from "@/services/tasks";
import { JwtPayload } from "@/lib/jwt";

type AuthenticatedRequest = Request & { user?: JwtPayload };

export class TaskController {
  // Create Task
  public createTask = async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
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
  public getTask = async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.sub;

    if (!userId) {
      return res.status(401).json({
        code: 401,
        status: "error",
        message: "Authentication required",
      });
    }

    const { id } = req.params ?? {};
    const result = await GetTaskService(id as string, userId);
    return res.status(result.code).json(result);
  };

  // Get All Tasks for User
  public getAllTasks = async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
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
  public updateTask = async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
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
    const result = await UpdateTaskService(id as string, userId, { title, description, completed });
    return res.status(result.code).json(result);
  };

  // Delete Task
  public deleteTask = async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.sub;

    if (!userId) {
      return res.status(401).json({
        code: 401,
        status: "error",
        message: "Authentication required",
      });
    }

    const { id } = req.params ?? {};
    const result = await DeleteTaskService(id as string, userId);
    return res.status(result.code).json(result);
  };
}
