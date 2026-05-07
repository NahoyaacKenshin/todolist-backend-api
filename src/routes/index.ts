import { Router } from "express";
import authRoutes from "@/routes/auth.routes";
import taskRoutes from "@/routes/task.routes";

const router = Router();

// Auth Endpoints
router.use("/auth", authRoutes);

// Task Endpoints
router.use("/tasks", taskRoutes);

export default router;